import React, { useState } from 'react';
import * as fal from "@fal-ai/serverless-client";
import { Box, Typography, Button, TextField } from '@mui/material';
import SliderInput from './SliderInput';

const ImageToImageForm = ({ handleResult }) => {
  const [prompt, setPrompt] = useState('');
  const [strength, setStrength] = useState(0.95);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [imageSize, setImageSize] = useState(512);
  const [inferenceSteps, setInferenceSteps] = useState(50);
  const [guidanceScale, setGuidanceScale] = useState(7.5);

  const onGenerate = async () => {
    if (!uploadedImage) {
      setErrorMessage('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Upload the file to fal.ai storage
      const uploadedFileUrl = await fal.storage.upload(uploadedImage);

      const input = {
        image_url: uploadedFileUrl,
        prompt,
        strength: parseFloat(strength),
        image_size: imageSize,
        num_inference_steps: parseInt(inferenceSteps),
        guidance_scale: parseFloat(guidanceScale),
        enable_safety_checker: false
      };

      const result = await fal.subscribe("fal-ai/flux/dev/image-to-image", {
        input,
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {

          }
        },
      });

      onGenerate(result.images.map(image => image.url));
      setSuccessMessage('Image-to-image generation successful!');
    } catch (error) {
      console.error('Error generating image:', error);
      setErrorMessage('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setUploadedImage(file);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Image to Image</Typography>
      <Button variant="contained" component="label" sx={{ mb: 2 }}>
        Choose Image
        <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
      </Button>
      {selectedImage && (
        <Box sx={{ mb: 2 }}>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </Box>
      )}
      <TextField
        label="Prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <SliderInput
        label={`Strength: ${strength}`}
        value={strength}
        onChange={(value) => setStrength(value)}
        min={0}
        max={1}
        step={0.01}
      />
      <SliderInput
        label={`Image Size: ${imageSize}`}
        value={imageSize}
        onChange={(value) => setImageSize(value)}
        min={128}
        max={1024}
        step={64}
      />
      <SliderInput
        label={`Inference Steps: ${inferenceSteps}`}
        value={inferenceSteps}
        onChange={(value) => setInferenceSteps(value)}
        min={10}
        max={150}
        step={1}
      />
      <SliderInput
        label={`Guidance Scale: ${guidanceScale}`}
        value={guidanceScale}
        onChange={(value) => setGuidanceScale(value)}
        min={1}
        max={20}
        step={0.1}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={onGenerate} 
        fullWidth
        disabled={!uploadedImage || isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate Image'}
      </Button>
      {errorMessage && (
        <Typography color="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      )}
      {successMessage && (
        <Typography color="success" sx={{ mt: 2 }}>
          {successMessage}
        </Typography>
      )}
    </Box>
  );
};

export default ImageToImageForm;