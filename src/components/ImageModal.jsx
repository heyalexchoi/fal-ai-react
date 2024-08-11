import React from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ImageModal = ({ open, onClose, imageSrc }) => {
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
      <Box>
        <IconButton
          sx={{ position: 'absolute', right: 8, top: 8 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <img src={imageSrc} alt="Selected" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </Box>
    </Modal>
  );
};

export default ImageModal;