import { extendTheme } from '@chakra-ui/react';
import '@fontsource/inter';

const theme = extendTheme({
  body: {
    bg: '#F7F7FA',
  },
  fonts: {
    heading: '\'Montserrat\', sans-serif',
    body: '\'Inter\', sans-serif',
  },
});

export default theme;