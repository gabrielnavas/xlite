import { createTheme } from '@mui/material/styles';

// Definição das cores do Twitter Dark
export const twitterBlue = '#1DA1F2';
export const twitterWhite = '#FFFFFF';
export const twitterBlack = '#000000';
export const twitterDarkGray = '#15202B';
export const twitterLightGray = '#AAB8C2';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: twitterBlue,
      contrastText: twitterWhite,
    },
    background: {
      default: twitterBlack,
      paper: twitterDarkGray,
    },
    text: {
      primary: twitterWhite,
      secondary: twitterLightGray,
    },
    divider: twitterLightGray,
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
