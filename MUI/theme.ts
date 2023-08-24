'use client';
import { createTheme } from '@mui/material/styles';
import { avenirBold, avenirReg } from '@/utils/fonts';

const colorBrand1 = '#6AAE55';
const colorBrand2 = '#F2994A';
const colorPrimary = '#5B4A58';
const colorError = '#EB5757';
const colorLight = '#FFFFFF';

const FSTheme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colorPrimary,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          color: colorBrand1,
        },
        contained: {
          color: colorLight,
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          color: colorPrimary,
        },
      },
    },
  },
  typography: {
    button: {
      fontFamily: avenirBold.style.fontFamily,
    },
    body1: {
      fontFamily: avenirReg.style.fontFamily,
      fontSize: '12px',
    },
  },
  palette: {
    primary: {
      main: colorBrand1,
      contrastText: colorPrimary,
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
