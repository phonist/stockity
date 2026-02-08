import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Routing } from './app/routes';

const mdTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0e7a6d',
    },
    secondary: {
      main: '#ff6b35',
    },
    background: {
      default: '#f4f7f2',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: 'Manrope, "Avenir Next", "Segoe UI", sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 750,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 700,
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <Routing />
    </ThemeProvider>
  );
}
