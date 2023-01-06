import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      bg: '#FBFBFD',
    },
  },
  fonts: {
    heading: '\'SF Pro Display\', sans-serif',
    body: '\'SF Pro Text\', sans-serif',
  },
});

export default theme;