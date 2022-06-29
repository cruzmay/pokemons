import { createTheme } from '@mui/material/styles';

const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: 'rgba(255,255,255,)',
    },
    secondary: {
      main: '#e91e63',
    },
    background: {
      default: '#f7f5f5',
    },
    text: {
      primary: '#263238',
      secondary: '#254a73',
    },
  },
};

export const Theme = createTheme(themeOptions)