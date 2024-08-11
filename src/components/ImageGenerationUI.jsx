import React, { useState } from 'react';
import {
  Container,
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Slider,
  Button,
  IconButton,
  Modal,
  Grid,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ImageGenerationUI = () => {
  const [tabValue, setTabValue] = useState(0);
  const [model, setModel] = useState('');
  const [prompt, setPrompt] = useState('');
  const [imageSize, setImageSize] = useState('');
  const [inferenceSteps, setInferenceSteps] = useState(30);
  const [guidanceScale, setGuidanceScale] = useState(7);
  const [safetyTolerance, setSafetyTolerance] = useState(5);
  const [imageCount, setImageCount] = useState(1);
  const [strength, setStrength] = useState(0.95);
  const [loading, setLoading] = useState(false);
  const [resultImages, setResultImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleGenerate = () => {
    setLoading(true);
    // TODO: Implement actual API call here
    setTimeout(() => {
      setResultImages(['https://via.placeholder.com/300', 'https://via.placeholder.com/300']);
      setLoading(false);
    }, 2000);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setModalOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Text to Image" />
        <Tab label="Image to Image" />
      </Tabs>

      <Box mt={3}>
        {tabValue === 0 && (
          <Box>
            <Typography variant="h6">Input</Typography>
            <Select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              fullWidth
              margin="normal"
            >
              <MenuItem value="flux1-schnell">Flux.1 [schnell]</MenuItem>
              <MenuItem value="flux1-dev">Flux.1 [dev]</MenuItem>
              <MenuItem value="flux-pro">Flux Pro</MenuItem>
            </Select>
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
              <MenuItem value="landscape-4-3">Landscape 4:3</MenuItem>
              <MenuItem value="square">Square</MenuItem>
              <MenuItem value="hd">HD</MenuItem>
              <MenuItem value="portrait-4-3">Portrait 4:3</MenuItem>
              <MenuItem value="landscape-16-9">Landscape 16:9</MenuItem>
            </Select>
            <Typography gutterBottom>Num Inference Steps</Typography>
            <Slider
              value={inferenceSteps}
              onChange={(_, value) => setInferenceSteps(value)}
              min={1}
              max={100}
              valueLabelDisplay="auto"
            />
            <Typography gutterBottom>Guidance Scale</Typography>
            <Slider
              value={guidanceScale}
              onChange={(_, value) => setGuidanceScale(value)}
              min={1}
              max={20}
              step={0.1}
              valueLabelDisplay="auto"
            />
            <Typography gutterBottom>Safety Tolerance: {safetyTolerance}</Typography>
            <Slider
              value={safetyTolerance}
              onChange={(_, value) => setSafetyTolerance(value)}
              min={1}
              max={10}
              valueLabelDisplay="auto"
            />
            <Typography gutterBottom>Number of Images: {imageCount}</Typography>
            <Slider
              value={imageCount}
              onChange={(_, value) => setImageCount(value)}
              min={1}
              max={4}
              step={1}
              marks
              valueLabelDisplay="auto"
            />
            <Button variant="contained" color="primary" onClick={handleGenerate} fullWidth>
              Generate Image
            </Button>
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <Typography variant="h6">Image to Image</Typography>
            <Button variant="contained" component="label">
              Choose Image
              <input type="file" hidden />
            </Button>
            <TextField
              label="Prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <Typography gutterBottom>Strength: {strength}</Typography>
            <Slider
              value={strength}
              onChange={(_, value) => setStrength(value)}
              min={0}
              max={1}
              step={0.01}
              valueLabelDisplay="auto"
            />
            {/* Repeat other inputs similar to Text to Image */}
            <Button variant="contained" color="primary" onClick={handleGenerate} fullWidth>
              Generate Image
            </Button>
          </Box>
        )}
      </Box>

      <Box mt={3}>
        <Typography variant="h6">Result</Typography>
        {loading ? (
          <Typography>Generating image...</Typography>
        ) : (
          <Grid container spacing={2}>
            {resultImages.map((img, index) => (
              <Grid item xs={6} key={index}>
                <img
                  src={img}
                  alt={`Generated ${index + 1}`}
                  style={{ width: '100%', cursor: 'pointer' }}
                  onClick={() => handleImageClick(img)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <IconButton
            sx={{ position: 'absolute', right: 8, top: 8 }}
            onClick={() => setModalOpen(false)}
          >
            <CloseIcon />
          </IconButton>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
        </Box>
      </Modal>

      <Box mt={3}>
        <Typography variant="h6">Gallery</Typography>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Grid container spacing={2}>
            {/* Add gallery images here */}
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default ImageGenerationUI;