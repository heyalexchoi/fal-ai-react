import React from 'react';
import { Typography, Select, MenuItem } from '@mui/material';

const ModelSelector = ({
  model,
  setModel,
}) => {
  return (
    <>
    <Typography variant="h6">Model</Typography>
      <Select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="fal-ai/flux-general">Flux.1 GENERAL [dev]</MenuItem>
        <MenuItem value="fal-ai/flux-pro">Flux Pro</MenuItem>
        <MenuItem value="fal-ai/flux/schnell">Flux.1 [schnell]</MenuItem>
        <MenuItem value="fal-ai/flux-realism">Flux Realism</MenuItem>
      </Select>
    </>
  )
}

export default ModelSelector;