import React, { useState, useEffect } from 'react';
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

const SAVED_GALLERY_IMAGES_KEY = 'savedGalleryImages';

const ImageGenerationUI = () => {
  const [tabValue, setTabValue] = useState(0);
  const [resultImages, setResultImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const savedImages = localStorage.getItem(SAVED_GALLERY_IMAGES_KEY);
    if (savedImages) {
      setGalleryImages(JSON.parse(savedImages));
    }
  }, []);

  useEffect(() => {
    if (galleryImages.length < 1) {
      return 
    }
    localStorage.setItem(SAVED_GALLERY_IMAGES_KEY, JSON.stringify(galleryImages));
  }, [galleryImages]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const onResult = (result) => {
    for (const image of result.images) { 
      image.seed = result.seed;
      image.prompt = result.prompt;
      image.model = result.model;
      image.guidance_scale = result.guidance_scale;
    }
    setResultImages(result.images);
    setGalleryImages(prevImages => [...result.images, ...prevImages]);
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
        image={selectedImage} 
      />

      <GallerySection 
        images={galleryImages} 
        onImageClick={handleImageClick}
      />
    </Container>
  );
};

export default ImageGenerationUI;