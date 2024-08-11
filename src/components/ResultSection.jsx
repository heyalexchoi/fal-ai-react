import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const ResultSection = ({ loading, resultImages, onImageClick }) => (
  <Box mt={3}>
    <Typography variant="h6">Results</Typography>
    {loading ? (
      <Typography>Generating images...</Typography>
    ) : resultImages.length > 0 ? (
      <Grid container spacing={2}>
        {resultImages.map((img, index) => (
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
    ) : (
      <Typography>No images generated yet.</Typography>
    )}
  </Box>
);

export default ResultSection;
