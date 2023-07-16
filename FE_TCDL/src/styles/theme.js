import { extendTheme } from '@chakra-ui/react';

const configColorMode = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  configColorMode,
  fonts: {
    heading: `'Inter', sans-serif;`,
    body: `'Inter', sans-serif;`,
  },
});

export default theme;
