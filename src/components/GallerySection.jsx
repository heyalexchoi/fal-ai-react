import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import ImageGallery from './ImageGallery';

const GallerySection = ({ imageURLs, onImageClick }) => (
  <Box mt={3}>
    <Typography variant="h6">Gallery</Typography>
    <Paper elevation={3} style={{ padding: 16 }}>
      <ImageGallery images={imageURLs} onImageClick={onImageClick} />
    </Paper>
  </Box>
);

export default GallerySection;