import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Navigation from '../layout/AppBar';
import TickerPage from '../../features/tickers/components/Ticker';

const Routing = () => {
  return (
    <Router>
      <Box sx={{ minHeight: '100vh', px: { xs: 1.5, md: 3 }, pb: 4 }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<TickerPage />} />
          <Route path="*" element={<TickerPage />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default Routing;
