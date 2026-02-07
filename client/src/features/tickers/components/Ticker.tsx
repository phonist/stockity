import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { attemptGetTickers } from '../store/thunks/Tickers';
import { attemptGetQuotes } from '../../quotes/store/thunks/Quotes';
import { attemptGetQuoteSummaries } from '../../quoteSummaries/store/thunks/QuoteSummaries';
import { attemptGetInsights } from '../../insights/store/thunks/Insights';
import { AppState } from '../../../app/store';
import CandleStick from '../../../shared/components/templates/CandleStick';
import MetaBoard from '../../../shared/components/templates/MetaBoard';
import BasicTable from '../../../shared/components/templates/Table';
import NestedList from '../../../shared/components/templates/NestedList';
import {
  Box,
  Toolbar,
  Container,
  Grid,
  Paper,
} from '@mui/material';

export default function TickerPage() {
  const dispatch = useDispatch();

  useEffect(() => {
  }, [dispatch]);

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={12}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CandleStick />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 300,
              }}
            >
              <MetaBoard />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <BasicTable />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <NestedList />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
