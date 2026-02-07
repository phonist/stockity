import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TickerPage from './features/tickers/components/Ticker';
import Navigation from './app/layout/AppBar';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const mdTheme = createTheme();

export default function App() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Navigation 
          />
          <TickerPage />
        </Box>
    </ThemeProvider>
  );
}
