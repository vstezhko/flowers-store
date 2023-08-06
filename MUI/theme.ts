'use client';
import { createTheme } from '@mui/material/styles';

const colorBrand1 = '#6AAE55';
const colorBrand2 = '#F2994A';

const FSTheme = createTheme({
  typography: {
    button: {
      fontWeight: 700,
    },
  },
  palette: {
    primary: {
      main: colorBrand1,
    },
    secondary: {
      main: colorBrand2,
    },
  },
});

export default FSTheme;
