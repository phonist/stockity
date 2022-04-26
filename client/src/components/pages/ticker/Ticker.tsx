import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { attemptGetTickers } from '../../../redux/thunks/Tickers';
import { attemptGetQuotes } from '../../../redux/thunks/Quotes';
import { attemptGetQuoteSummaries } from '../../../redux/thunks/QuoteSummaries';
import { attemptGetInsights } from '../../../redux/thunks/Insights';
import { AppState } from '../../../redux/store';
import CandleStick from '../../templates/CandleStick';
import MetaBoard from '../../templates/MetaBoard';
import BasicTable from '../../templates/Table';
import NestedList from '../../templates/NestedList';
import {
  Box,
  Toolbar,
  Container,
  Grid,
  Paper,
} from '@mui/material';

export default function TickerPage() {
  const dispatch = useDispatch();

  const [tickerParams, setTickerParams] = useState({
    range: "1mo",
    region: "US",
    interval: "1d",
    lang: "en",
    ticker: "AAPL",
    events: "div"
  });

  const [quoteParams, setQuoteParams] = useState({
    region: "US",
    lang: "en",
    symbols: "AAPL"
  });

  const [quoteSummaryParams, setQuoteSummaryParams] = useState({
    lang: "en",
    region: "US",
    modules: "defaultKeyStatistics%2CassetProfile",
    symbol: "AAPL"
  });

  const [insightParams, setInsightParams] = useState({
    symbol: "AAPL",
  });

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
              {/* <CandleStick tickerParams={tickerParams} /> */}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              {/* <MetaBoard quoteParams={quoteParams} /> */}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <BasicTable quoteSummaryParams={quoteSummaryParams}/>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              {/* <NestedList insightParams={insightParams}/> */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
