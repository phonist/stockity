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

const safeFmt = (value: any): string => {
  if (!value || value.fmt === null || value.fmt === undefined || value.fmt === '') {
    return 'N/A';
  }
  return String(value.fmt);
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

    const data = quoteSummaries.quoteSummaries.result?.[0];
    if (!data) {
      return;
    }

    setValuationMeasures([
      { name: 'Market Cap', value: safeFmt(data.summaryDetail?.marketCap) },
      { name: 'Enterprise Value', value: safeFmt(data.defaultKeyStatistics?.enterpriseValue) },
      { name: 'Trailing P/E', value: safeFmt(data.summaryDetail?.trailingPE) },
      { name: 'Forward P/E', value: safeFmt(data.defaultKeyStatistics?.forwardPE) },
      { name: 'PEG Ratio (5Y)', value: safeFmt(data.defaultKeyStatistics?.pegRatio) },
      { name: 'Price/Sales (TTM)', value: safeFmt(data.summaryDetail?.priceToSalesTrailing12Months) },
      { name: 'Price/Book (MRQ)', value: safeFmt(data.defaultKeyStatistics?.priceToBook) },
      { name: 'EV/Revenue', value: safeFmt(data.defaultKeyStatistics?.enterpriseToRevenue) },
      { name: 'EV/EBITDA', value: safeFmt(data.defaultKeyStatistics?.enterpriseToEbitda) },
    ]);

    setFiscalYear([
      { name: 'Fiscal Year Ends', value: safeFmt(data.defaultKeyStatistics?.lastFiscalYearEnd) },
      { name: 'Most Recent Quarter', value: safeFmt(data.defaultKeyStatistics?.mostRecentQuarter) },
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
        <MetricCard title="Valuation" items={valuationMeasures} />
      </Grid>
      <Grid item xs={12} md={5}>
        <MetricCard title="Financial Highlights" items={fiscalYear} />
      </Grid>
    </Grid>
  );
}
