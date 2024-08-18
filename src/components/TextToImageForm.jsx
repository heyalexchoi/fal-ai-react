import React, { useState, useEffect } from 'react';
import * as fal from "@fal-ai/serverless-client";
import { Box, Typography, Select, MenuItem, TextField, Button } from '@mui/material';
import SliderInput from './SliderInput';
import ModelSelector from './ModelSelector';
import ObjectListBuilder from './ObjectListBuilder';

const T2I_FORM_STATE_KEY = 'textToImageFormState';

const TextToImageForm = ({ apiKey, onResult }) => {
  const [model, setModel] = useState('');
  const [loras, setLoras] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [imageSize, setImageSize] = useState('square');
  const [inferenceSteps, setInferenceSteps] = useState(28);
  const [guidanceScale, setGuidanceScale] = useState(3.5);
  const [safetyTolerance, setSafetyTolerance] = useState(6);
  const [imageCount, setImageCount] = useState(1);
  const [repeats, setRepeats] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [seed, setSeed] = useState(Math.floor(Math.random() * 1000000));
  const [negativePrompt, setNegativePrompt] = useState('');

  useEffect(() => {
    const savedState = localStorage.getItem(T2I_FORM_STATE_KEY);
    if (savedState) {
      const parsedState = JSON.parse(savedState);

      setModel(parsedState.model || '');
      setLoras(parsedState.loras || []);
      setPrompt(parsedState.prompt || '');
      setImageSize(parsedState.imageSize || 'square');
      setInferenceSteps(parsedState.inferenceSteps || 28);
      setGuidanceScale(parsedState.guidanceScale || 3.5);
      setSafetyTolerance(parsedState.safetyTolerance || 6);
      setImageCount(parsedState.imageCount || 1);
      setRepeats(parsedState.repeats || 1);
      setNegativePrompt(parsedState.negativePrompt || '');
    }
  }, []);

  useEffect(() => {
    if (!model) {
      return;
    }
    const stateToSave = {
      model,
      loras,
      prompt,
      imageSize,
      inferenceSteps,
      guidanceScale,
      safetyTolerance,
      imageCount,
      repeats,
      negativePrompt
    };
    // Remove empty fields from stateToSave
    Object.keys(stateToSave).forEach(key => {
      if (stateToSave[key] === '' || stateToSave[key] === null || stateToSave[key] === undefined) {
        delete stateToSave[key];
      }
    });


    localStorage.setItem(T2I_FORM_STATE_KEY, JSON.stringify(stateToSave));
  }, [model, prompt, imageSize, inferenceSteps, guidanceScale, safetyTolerance, imageCount, negativePrompt]);


  const onGenerate = async () => {
    if (!prompt || !model) {
      setErrorMessage('Please provide both a prompt and select a model.');
      return;
    }

    if (loras.length > 0 && !model.endsWith('general')) {
      setStatusMessage('Loras will not be used on non-dev models.');
    }

    fal.config({
      credentials: apiKey,
    });
    setIsLoading(true);
    setErrorMessage('');
    setStatusMessage('');
    setSuccessMessage('');

    try {
      const input = {
        prompt,
        image_size: imageSize,
        num_inference_steps: parseInt(inferenceSteps),
        num_images: parseInt(imageCount) || 1
      };

      if (model.endsWith('general')) {
        input.loras = loras;
      }

      if (model.endsWith('dev') || model.endsWith('realism') || model.endsWith('general')) {
        input.guidance_scale = parseFloat(guidanceScale);
        input.enable_safety_checker = false;
      } else if (model.endsWith('pro')) {
        input.guidance_scale = parseFloat(guidanceScale);
        input.safety_tolerance = safetyTolerance;
      } else if (model.endsWith('schnell')) {
        input.enable_safety_checker = false;
      }

      let results = [];
      let _seed = parseInt(seed);

      console.log('input:', input);

      for (let i = 0; i < repeats; i++) {
        input.seed = _seed;

        const result = fal.subscribe(model, {
          input,
          logs: true,
          onQueueUpdate: (update) => {
  
            if (update.status === "IN_PROGRESS") {
  
              if (update.logs.length > 0) {
  
                setStatusMessage(update.logs[update.logs.length - 1].message);
              }
            } else if (update.status === "IN_QUEUE") {
              setStatusMessage('In Queue');
            } else {
  
              setStatusMessage('');
            }
          },
        });
        results.push(result);
        _seed += input.num_images;
      }

      const resolvedResults = await Promise.all(results);
      const combinedResults = resolvedResults.reduce((acc, result) => {
        return {
          images: [...acc.images, ...result.images],
          seed: acc.seed || result.seed,
          prompt: acc.prompt || result.prompt,
        };
      }, { images: [], seed: null, prompt: null });

      combinedResults.model = model;
      combinedResults.guidance_scale = input.guidance_scale;

      console.log('combinedResults:', combinedResults);
      onResult(combinedResults);
      setSuccessMessage('Images generated successfully!');
    } catch (error) {
      let message = error.message || 'Unknown error';
      if (error.body && error.body.detail) {
        message = error.body.detail;
      }
      console.error('Error generating image:', error);
      console.error('Error generating image:', message);
      const errorDetails = error.message || 'Unknown error';
      const errorStatus = error.status ? `Status: ${error.status}` : '';
      setErrorMessage(`Failed to generate images. ${error.name} ${errorStatus} ${errorDetails}`.trim());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <ModelSelector 
        model={model}
        setModel={setModel}
      />
      <ObjectListBuilder
        value={loras}
        setValue={setLoras}
        valueKey="path"
        label="Loras"
        placeholder="Path to Lora"
      />
      <TextField
        label="Prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Select
        value={imageSize}
        onChange={(e) => setImageSize(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="square_hd">Square HD</MenuItem>
        <MenuItem value="square">Square</MenuItem>
        <MenuItem value="landscape_4_3">Landscape 4:3</MenuItem>
        <MenuItem value="landscape_16_9">Landscape 16:9</MenuItem>
        <MenuItem value="portrait_4_3">Portrait 4:3</MenuItem>
        <MenuItem value="portrait_16_9">Portrait 16:9</MenuItem>
      </Select>
      <SliderInput
        label={`Num Inference Steps: ${inferenceSteps}`}
        value={inferenceSteps}
        onChange={(value) => setInferenceSteps(value)}
        min={1}
        max={50}
      />
      <SliderInput
        label={`Guidance Scale: ${guidanceScale}`}
        value={guidanceScale}
        onChange={(value) => setGuidanceScale(value)}
        min={1}
        max={10}
        step={0.1}
      />
      <SliderInput
        label={`Safety Tolerance: ${safetyTolerance}`}
        value={safetyTolerance}
        onChange={(value) => setSafetyTolerance(value)}
        min={1}
        max={6}
      />
      <SliderInput
        label={`Number of Images: ${imageCount}`}
        value={imageCount}
        onChange={(value) => setImageCount(value)}
        min={1}
        max={4}
        step={1}
        marks
      />
      <SliderInput
        label={`Number of Repeats: ${repeats}`}
        value={repeats}
        onChange={(value) => setRepeats(value)}
        min={1}
        max={10}
        step={1}
        marks
      />
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          type="number"
          label="Seed"
          value={seed}
          onChange={(e) => setSeed(parseInt(e.target.value))}
          sx={{ flexGrow: 1, mr: 1 }}
        />
        <Button
          variant="outlined"
          onClick={() => setSeed(Math.floor(Math.random() * 1000000))}
        >
          Random
        </Button>
      </Box>
      <Button variant="contained" color="primary" onClick={onGenerate} fullWidth disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Image'}
      </Button>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      {statusMessage && <Typography color="success">{statusMessage}</Typography>}
      {successMessage && <Typography color="success">{successMessage}</Typography>}
    </Box>
  );
};

export default TextToImageForm;