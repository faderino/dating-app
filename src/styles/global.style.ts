import { createGlobalStyle } from 'styled-components';
import AtypDisplayRegularTTF from '../assets/fonts/AtypDisplay-Regular.ttf';
import AtypDisplayMediumTTF from '../assets/fonts/AtypDisplay-Medium.ttf';
import AtypDisplayBoldTTF from '../assets/fonts/AtypDisplay-Bold.ttf';
import colors from './colors';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Atyp Display';
    src: url(${AtypDisplayRegularTTF}) format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: auto;
  }

  @font-face {
    font-family: 'Atyp Display';
    src: url(${AtypDisplayMediumTTF}) format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: auto;
  }

  @font-face {
    font-family: 'Atyp Display';
    src: url(${AtypDisplayBoldTTF}) format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: auto;
  }

  * {
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    color: ${colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    font-size: 1rem;
    background-color: transparent;
  }
`;
