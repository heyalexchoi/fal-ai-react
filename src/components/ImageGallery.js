import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const ImageGallery = ({ images, onImageClick }) => (
  <Grid container spacing={2}>
    {images.map((image, index) => (
      <Grid item xs={6} sm={4} md={3} key={index}>
        <img
          src={image.url}
          alt={`Generated ${index + 1}`}
          style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
          onClick={() => onImageClick(image)}
        />
      </Grid>
    ))}
  </Grid>
);

export default ImageGallery;
