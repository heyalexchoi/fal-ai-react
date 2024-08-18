import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ObjectListBuilder = ({ label, placeholder, value, setValue, valueKey }) => {
  const [currentInput, setCurrentInput] = useState('');

  const handleAdd = () => {
    if (currentInput.trim()) {
      const newList = [...value, { [valueKey]: currentInput.trim() }];
      setValue(newList.filter(item => item[valueKey] !== ''));
      setCurrentInput('');
    }
  };

  const handleRemove = (index) => {
    const newList = value.filter((_, i) => i !== index);
    setValue(newList.filter(item => item[valueKey] !== ''));
  };

  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <Box>
      <TextField
        label={label}
        placeholder={placeholder}
        value={currentInput}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleAdd} variant="contained" color="primary">
        Add
      </Button>
      <List>
        {value.map((item, index) => (
          <ListItem key={index} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(index)}>
              <DeleteIcon />
            </IconButton>
          }>
            {item[valueKey]}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ObjectListBuilder;
