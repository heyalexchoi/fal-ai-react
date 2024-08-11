import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import ImageGenerationUI from './components/ImageGenerationUI.jsx';
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // You can customize colors further if needed
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <ImageGenerationUI />
      </ThemeProvider>
    </div>
  );
}

export default App;
