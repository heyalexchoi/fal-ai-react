import React from 'react';
import { Typography, Slider } from '@mui/material';

const SliderInput = ({ label, value, onChange, min, max, step, marks, valueLabelDisplay = "auto" }) => (
  <>
    <Typography gutterBottom>{label}</Typography>
    <Slider
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      min={min}
      max={max}
      step={step}
      marks={marks}
      valueLabelDisplay={valueLabelDisplay}
    />
  </>
);

export default SliderInput;