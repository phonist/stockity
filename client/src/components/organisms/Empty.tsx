import * as React from 'react';
import { Box, Typography }from '@mui/material';

export default function EmptyContainer() {
  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom component="div">
        No data to display
      </Typography>
    </Box>
  );
}