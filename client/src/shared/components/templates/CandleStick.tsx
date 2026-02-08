import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { attemptGetTickers } from '../../../features/tickers/store/thunks/Tickers';
import { AppState } from '../../../app/store';
import LoadingContainer from '../common/Loading';
import ErrorContainer from '../common/Error';
import EmptyContainer from '../common/Empty';

interface ChartPoint {
  x: string;
  y: number[];
}

export default function CandleStick() {
  const dispatch = useDispatch();
  const tickers = useSelector((state: AppState) => state.tickers);
  const [series, setSeries] = useState([{ data: [] as ChartPoint[] }]);
  const [symbol, setSymbol] = useState('AAPL');

  useEffect(() => {
    if (tickers.loading) {
      dispatch(attemptGetTickers(tickers.postTicker));
    }
  }, [dispatch, tickers.loading, tickers.postTicker]);

  useEffect(() => {
    if (tickers.loading || tickers.error || tickers.empty) {
      return;
    }

    const chartResult = tickers.tickers?.result?.[0];
    if (!chartResult || !chartResult.timestamp || !chartResult.indicators?.quote?.[0]) {
      return;
    }

    const quotes = chartResult.indicators.quote[0];
    const points = chartResult.timestamp
      .map((item: any, index: number) => {
        const open = quotes.open?.[index];
        const high = quotes.high?.[index];
        const low = quotes.low?.[index];
        const close = quotes.close?.[index];

        if ([open, high, low, close].some(value => value === null || value === undefined)) {
          return null;
        }

        return {
          x: new Date(Number(item) * 1000).toISOString(),
          y: [Number(open.toFixed(2)), Number(high.toFixed(2)), Number(low.toFixed(2)), Number(close.toFixed(2))],
        } as ChartPoint;
      })
      .filter(Boolean) as ChartPoint[];

    setSeries([{ data: points }]);
    setSymbol(chartResult.meta?.symbol || 'Ticker');
  }, [tickers.loading, tickers.error, tickers.empty, tickers.tickers]);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1.5 }}>
        Price Action: {symbol}
      </Typography>

      {tickers.error && <ErrorContainer />}
      {tickers.empty && <EmptyContainer />}
      {tickers.loading ? (
        <LoadingContainer />
      ) : (
        <ReactApexChart
          type="candlestick"
          height={360}
          series={series}
          options={{
            chart: {
              type: 'candlestick',
              toolbar: { show: false },
              zoom: { enabled: false },
              foreColor: '#405044',
            },
            grid: {
              borderColor: 'rgba(64,80,68,0.15)',
            },
            xaxis: {
              type: 'category',
              labels: {
                rotate: 0,
                formatter: val => new Date(val).toLocaleDateString(),
              },
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
              labels: {
                formatter: val => `${val.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </Box>
  );
}
