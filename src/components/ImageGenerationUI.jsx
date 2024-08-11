import React, { useState } from 'react';
import {
  Container,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import TextToImageForm from './TextToImageForm';
import ImageToImageForm from './ImageToImageForm';
import ResultSection from './ResultSection';
import ImageModal from './ImageModal';
import GallerySection from './GallerySection';
import APIKeyInput from './APIKeyInput';

const ImageGenerationUI = () => {
  const [tabValue, setTabValue] = useState(0);
  const [resultImages, setResultImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const onResult = (result) => {

    setResultImages(result);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setModalOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Text to Image" />
        <Tab label="Image to Image" />
      </Tabs>

      <APIKeyInput apiKey={apiKey} setApiKey={setApiKey} />

      <Box mt={3}>
        {tabValue === 0 && (
          <TextToImageForm 
            apiKey={apiKey} 
            onResult={onResult}
          />
          )}
        {tabValue === 1 && <ImageToImageForm apiKey={apiKey} />}
      </Box>

      <ResultSection 
        loading={loading} 
        resultImages={resultImages} 
        onImageClick={handleImageClick} 
      />

      <ImageModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        imageSrc={selectedImage} 
      />

      <GallerySection imageURLs={resultImages} />
    </Container>
  );
};

export default ImageGenerationUI;