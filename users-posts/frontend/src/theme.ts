import { createTheme } from '@mui/material/styles';

// Definição das cores do Twitter Dark
const twitterBlue = '#1DA1F2';
const twitterWhite = '#FFFFFF';
const twitterBlack = '#000000';
const twitterDarkGray = '#15202B';
const twitterLightGray = '#AAB8C2';

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
