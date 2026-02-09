import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { GetQuoteSummariesStateType } from './types/QuoteSummaryTypes';
import type { PostQuoteSummary, QuoteSummary } from './interfaces/QuoteSummary';

const initialState: GetQuoteSummariesStateType = {
  postQuoteSummaries: {
    region: 'US',
    lang: 'en',
    modules:
      'summaryDetail,assetProfile,fundProfile,financialData,defaultKeyStatistics,calendarEvents,incomeStatementHistory,incomeStatementHistoryQuarterly,cashflowStatementHistory,balanceSheetHistory,earnings,earningsHistory,insiderHolders,cashflowStatementHistory,cashflowStatementHistoryQuarterly,insiderTransactions,secFilings,indexTrend,sectorTrend,earningsTrend,netSharePurchaseActivity,upgradeDowngradeHistory,institutionOwnership,recommendationTrend,balanceSheetHistory,balanceSheetHistoryQuarterly,fundOwnership,majorDirectHolders,majorHoldersBreakdown,price,quoteType,esgScores',
    symbol: 'AAPL',
  },
  quoteSummaries: {
    data: {
      pagination: {
        limit: 0,
        offset: 0,
        count: 0,
        total: 0,
      },
      data: [
        {
          open: 0,
          high: 0,
          low: 0,
          close: 0,
          volume: 0,
          adj_high: 0,
          adj_low: 0,
          adj_close: 0,
          adj_open: 0,
          adj_volume: 0,
          split_factor: 1,
          dividend: 0,
          symbol: '',
          exchange: '',
          date: '',
        },
      ],
    },
    message: '',
    error: undefined,
  },
  loading: true,
  error: {},
  empty: true,
};

const quoteSummariesSlice = createSlice({
  name: 'quoteSummaries',
  initialState,
  reducers: {
    setQuoteSummaries(state, action: PayloadAction<QuoteSummary>) {
      state.quoteSummaries = action.payload;
      state.loading = false;
      state.error = action.payload.error;
      state.empty = false;
    },
    setPostQuoteSummaries(state, action: PayloadAction<PostQuoteSummary>) {
      state.postQuoteSummaries = action.payload;
      state.loading = true;
      state.error = true;
      state.empty = true;
    },
    setQuoteSummariesError(state, action: PayloadAction<any>) {
      state.quoteSummaries = {
        data: initialState.quoteSummaries.data,
        message: '',
        error: action.payload,
      };
      state.loading = false;
      state.error = true;
      state.empty = true;
    },
  },
});

export const { setQuoteSummaries, setPostQuoteSummaries, setQuoteSummariesError } = quoteSummariesSlice.actions;
export default quoteSummariesSlice.reducer;
