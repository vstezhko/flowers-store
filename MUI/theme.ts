'use client';
import { createTheme } from '@mui/material/styles';
import { literalReg } from '@/utils/fonts';

const colorBrand1 = '#6AAE55';
const colorBrand2 = '#F2994A';
const colorPrimary = '#5B4A58';
const colorError = '#EB5757';

const FSTheme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colorPrimary,
        },
      },
    },
  },
  typography: {
    button: {
      fontWeight: 700,
      fontFamily: literalReg.style.fontFamily,
    },
    body1: {
      fontWeight: 400,
      fontFamily: literalReg.style.fontFamily,
    },
  },
  palette: {
    primary: {
      main: colorBrand1,
    },
    secondary: {
      main: colorBrand2,
    },
    success: {
      main: colorBrand1,
    },
    error: {
      main: colorError,
    },
  },
});

export default FSTheme;
