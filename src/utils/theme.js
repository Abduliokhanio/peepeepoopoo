import { extendTheme } from '@chakra-ui/react';
import '@fontsource/inter';

const theme = extendTheme({
  body: {
    bg: '#F7F7FA',
  },
  fonts: {
    heading: '\'SF Pro Display\', sans-serif',
    body: '\'SF Pro Text\', sans-serif',
  },
});

export default theme;