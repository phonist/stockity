import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import CandleStick from '../../../shared/components/templates/CandleStick';
import MetaBoard from '../../../shared/components/templates/MetaBoard';
import BasicTable from '../../../shared/components/templates/Table';
import NestedList from '../../../shared/components/templates/NestedList';

export default function TickerPage() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <Box component="main" sx={{ mt: 3 }}>
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Paper
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: 4,
              color: '#f0fff9',
              background:
                'linear-gradient(135deg, rgba(11,97,86,1) 0%, rgba(24,130,114,1) 45%, rgba(255,107,53,0.85) 100%)',
            }}
          >
            <Typography variant="h4">Market Dashboard</Typography>
            <Typography sx={{ opacity: 0.9, mt: 0.5 }}>
              Real-time snapshot and analytics for your selected ticker.
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mt: 1.5, opacity: 0.85 }}>
              Updated {now.toLocaleDateString()} {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Typography>
          </Paper>

          <Grid container spacing={3}>
            <Grid item xs={12} lg={8.5}>
              <Paper sx={{ p: 2, borderRadius: 4, minHeight: 420 }}>
                <CandleStick />
              </Paper>
            </Grid>
            <Grid item xs={12} lg={3.5}>
              <Paper sx={{ p: 2, borderRadius: 4, minHeight: 420 }}>
                <MetaBoard />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2, borderRadius: 4 }}>
                <BasicTable />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2, borderRadius: 4 }}>
                <NestedList />
              </Paper>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
