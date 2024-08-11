import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

const GallerySection = ({ imageURLs}) => (
  <Box mt={3}>
    <Typography variant="h6">Gallery</Typography>
    <Paper elevation={3} style={{ padding: 16 }}>
      <Grid container spacing={2}>
        {imageURLs.map((url, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <img
              src={url}
              alt={`Gallery image ${index + 1}`}
              style={{ width: '100%', height: 'auto' }}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  </Box>
);

export default GallerySection;