import React from 'react';
import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
    /* latin */
     @font-face {
        font-family: 'SF Pro Display';
        font-style: normal;
        font-display: swap;
        src: url('../assets/fonts/SF-Pro-Display-Regular.otf') format('otf')
      }
      /* latin */
      @font-face {
        font-family: 'SF Pro Display';
        font-style: medium;
        font-display: swap;
        src: url('../assets/fonts/SF-Pro-Display-Medium.otf') format('otf')
      }
      /* latin */
      @font-face {
        font-family: 'SF Pro Display';
        font-style: bold;
        font-weight: 700;
        font-display: swap;
        src: url('../assets/fonts/SF-Pro-Display-Bold.otf') format('otf')
      }
      /* latin */
     @font-face {
        font-family: 'SF Pro Text';
        font-style: normal;
        font-display: swap;
        src: url('../assets/fonts/SF-Pro-Text-Regular.otf') format('otf')
      }
      /* latin */
      @font-face {
        font-family: 'SF Pro Text';
        font-style: medium;
        font-display: swap;
        src: url('../assets/fonts/SF-Pro-Text-Medium.otf') format('otf')
      }
      /* latin */
      @font-face {
        font-family: 'SF Pro Text';
        font-style: bold;
        font-display: swap;
        src: url('../assets/fonts/SF-Pro-Text-Bold.otf') format('otf')
      }
      `}
  />
);

export default Fonts;