import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Chip, Divider, Stack, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { attemptGetQuotes } from '../../../features/quotes/store/thunks/Quotes';
import LoadingContainer from '../common/Loading';
import EmptyContainer from '../common/Empty';
import ErrorContainer from '../common/Error';
import { AppState } from '../../../app/store';

function MetaBoard() {
  const dispatch = useDispatch();
  const quotes = useSelector((state: AppState) => state.quotes);
  const [isUp, setIsUp] = useState(true);

  useEffect(() => {
    if (quotes.loading) {
      dispatch(attemptGetQuotes(quotes.postQuote));
    }
  }, [dispatch, quotes.loading, quotes.postQuote]);

  useEffect(() => {
    const latest = quotes.quotes?.result?.[0]?.regularMarketChange;
    if (latest !== undefined && latest !== null) {
      setIsUp(latest >= 0);
    }
  }, [quotes.quotes]);

  const data = quotes.quotes?.result?.[0];

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Quote Snapshot
      </Typography>

      {quotes.error && <ErrorContainer />}
      {quotes.empty && <EmptyContainer />}
      {quotes.loading ? (
        <LoadingContainer />
      ) : (
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">{data?.symbol || 'N/A'}</Typography>
            <Chip
              icon={isUp ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              label={isUp ? 'Bullish' : 'Bearish'}
              color={isUp ? 'success' : 'error'}
              size="small"
            />
          </Stack>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {data?.regularMarketPrice ?? 'N/A'}
            </Typography>
            <Typography color={isUp ? 'success.main' : 'error.main'}>
              {(data?.regularMarketChange ?? 0).toFixed(2)} ({(data?.regularMarketChangePercent ?? 0).toFixed(2)}%)
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="body2" color="text.secondary">
              After Hours
            </Typography>
            <Typography sx={{ fontWeight: 700 }}>
              {(data?.postMarketPrice ?? 0).toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {(data?.postMarketChange ?? 0).toFixed(2)} ({(data?.postMarketChangePercent ?? 0).toFixed(2)}%)
            </Typography>
          </Box>
        </Stack>
      )}
    </Box>
  );
}

export default MetaBoard;
