import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const ImageGallery = ({ images, onImageClick }) => (
  <Grid container spacing={2}>
    {images.map((img, index) => (
      <Grid item xs={6} sm={4} md={3} key={index}>
        <img
          src={img}
          alt={`Generated ${index + 1}`}
          style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
          onClick={() => onImageClick(img)}
        />
      </Grid>
    ))}
  </Grid>
);

export default ImageGallery;
