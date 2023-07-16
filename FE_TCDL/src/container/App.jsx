import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/inter';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '../constants/router';
import theme from '../styles/theme';

export default function App() {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}
