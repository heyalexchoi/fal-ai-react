import React from 'react';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ImageModal = ({ open, onClose, image }) => {
  return (
    <Modal 
      open={open} 
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        outline: 'none',
      }}>
        <IconButton
          sx={{ position: 'absolute', right: 8, top: 8 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <img src={image.url} alt="Selected" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        <Box
          sx={{
            paddingY: 4,
            paddingX: 8,
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
        >
          <Typography variant="h6">Prompt:</Typography>
          <Typography variant="body">{image.prompt}</Typography>
          <Typography variant="h6">Seed:</Typography>
          <Typography variant="body">{image.seed}</Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default ImageModal;