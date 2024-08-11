import React, { useEffect } from 'react';
import { TextField, Box, Typography } from '@mui/material';

const API_KEY_LOCAL_STORAGE_KEY = 'apiKey';

const APIKeyInput = ({ apiKey, setApiKey }) => {
  useEffect(() => {
    const savedApiKey = localStorage.getItem(API_KEY_LOCAL_STORAGE_KEY);

    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, [setApiKey]);

  const handleApiKeyChange = (event) => {
    const newApiKey = event.target.value;
    setApiKey(newApiKey);
    localStorage.setItem(API_KEY_LOCAL_STORAGE_KEY, newApiKey);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>API Key</Typography>
      <TextField
        fullWidth
        label="Enter your API key"
        variant="outlined"
        type="password"
        value={apiKey}
        onChange={handleApiKeyChange}
        placeholder="Your API key"
      />
    </Box>
  );
};

export default APIKeyInput;
