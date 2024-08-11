import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import ImageGallery from './ImageGallery';

const ResultSection = ({ loading, resultImages, onImageClick }) => (
  <Box mt={3}>
    <Typography variant="h6">Results</Typography>
    {loading ? (
      <Typography>Generating images...</Typography>
    ) : resultImages.length > 0 ? (
      <ImageGallery images={resultImages} onImageClick={onImageClick} />
    ) : (
      <Typography>No images generated yet.</Typography>
    )}
  </Box>
);

export default ResultSection;
