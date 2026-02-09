import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Stack, Typography } from '@mui/material';
import { AppState } from '../../../app/store';
import { attemptGetQuoteSummaries } from '../../../features/quoteSummaries/store/thunks/QuoteSummaries';
import LoadingContainer from '../common/Loading';
import ErrorContainer from '../common/Error';
import EmptyContainer from '../common/Empty';

interface MetricItem {
  name: string;
  value: string;
}

const safeValue = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined || value === '') {
    return 'N/A';
  }
  return String(value);
};

export default function BasicTable() {
  const quoteSummaries = useSelector((state: AppState) => state.quoteSummaries);
  const dispatch = useDispatch();
  const [valuationMeasures, setValuationMeasures] = useState<MetricItem[]>([]);
  const [fiscalYear, setFiscalYear] = useState<MetricItem[]>([]);

  useEffect(() => {
    if (quoteSummaries.loading) {
      dispatch(attemptGetQuoteSummaries(quoteSummaries.postQuoteSummaries));
    }
  }, [dispatch, quoteSummaries.loading, quoteSummaries.postQuoteSummaries]);

  useEffect(() => {
    if (quoteSummaries.loading || quoteSummaries.error || quoteSummaries.empty) {
      return;
    }
    const data = quoteSummaries.quoteSummaries.data?.[0];
    if (!data) {
      return;
    }

    setValuationMeasures([
      { name: 'Open', value: safeValue(data.open?.toFixed(2)) },
      { name: 'High', value: safeValue(data.high?.toFixed(2)) },
      { name: 'Low', value: safeValue(data.low?.toFixed(2)) },
      { name: 'Close', value: safeValue(data.close?.toFixed(2)) },
      { name: 'Adjusted Open', value: safeValue(data.adj_open?.toFixed(2)) },
      { name: 'Adjusted High', value: safeValue(data.adj_high?.toFixed(2)) },
      { name: 'Adjusted Low', value: safeValue(data.adj_low?.toFixed(2)) },
      { name: 'Adjusted Close', value: safeValue(data.adj_close?.toFixed(2)) },
    ]);

    setFiscalYear([
      { name: 'Volume', value: safeValue(data.volume?.toLocaleString()) },
      { name: 'Adjusted Volume', value: safeValue(data.adj_volume?.toLocaleString()) },
      { name: 'Exchange', value: safeValue(data.exchange) },
      { name: 'Split Factor', value: safeValue(data.split_factor) },
      { name: 'Dividend', value: safeValue(data.dividend) },
      { name: 'Date', value: safeValue(data.date) },
    ]);
  }, [quoteSummaries.loading, quoteSummaries.error, quoteSummaries.empty, quoteSummaries.quoteSummaries]);

  if (quoteSummaries.error) {
    return <ErrorContainer />;
  }

  if (quoteSummaries.empty) {
    return <EmptyContainer />;
  }

  if (quoteSummaries.loading) {
    return <LoadingContainer />;
  }

  const MetricCard = ({ title, items }: { title: string; items: MetricItem[] }) => (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, height: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Stack spacing={1.5}>
        {items.map(item => (
          <Stack key={item.name} direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="body2" color="text.secondary">
              {item.name}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {item.value}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );

  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12} md={7}>
        <MetricCard title="Price Snapshot" items={valuationMeasures} />
      </Grid>
      <Grid item xs={12} md={5}>
        <MetricCard title="Market Details" items={fiscalYear} />
      </Grid>
    </Grid>
  );
}
