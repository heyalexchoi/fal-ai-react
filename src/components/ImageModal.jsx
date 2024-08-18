import React from 'react';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ImageModal = ({ open, onClose, image }) => {
  return (
    <Modal 
      open={open} 
      onClose={onClose}
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'flex-start',
        outline: 'none',
        height: '100%',
        width: '100%',
        padding: 2,
        overflow: 'auto',
      }}>
        <IconButton
          sx={{ alignSelf: 'flex-end', marginBottom: 2 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
        }}>
          <img 
            src={image.url} 
            alt="Selected" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%', 
              objectFit: 'contain' 
            }} 
          />
        </Box>
        <Box
          sx={{
            width: '100%',
            paddingY: 4,
            paddingX: 8,
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
        >
          <Typography variant="h6">Prompt:</Typography>
          <Typography variant="body1">{image.prompt}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>Seed:</Typography>
          <Typography variant="body1">{image.seed}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>Guidance:</Typography>
          <Typography variant="body1">{image.guidance_scale}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>Model:</Typography>
          <Typography variant="body1">{image.model}</Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default ImageModal;