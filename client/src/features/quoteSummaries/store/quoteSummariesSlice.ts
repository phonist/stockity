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
    result: [
      {
        assetProfile: {},
        recommendationTrend: {},
        cashflowStatementHistory: {},
        indexTrend: {},
        defaultKeyStatistics: {
          enterpriseValue: {
            fmt: '',
          },
          forwardPE: {
            fmt: '',
          },
          pegRatio: {
            fmt: '',
          },
          priceToBook: {
            fmt: '',
          },
          enterpriseToRevenue: {
            fmt: '',
          },
          enterpriseToEbitda: {
            fmt: '',
          },
          lastFiscalYearEnd: {
            fmt: '',
          },
          mostRecentQuarter: {
            fmt: '',
          },
        },
        quoteType: {},
        incomeStatementHistory: {},
        fundOwnership: {},
        summaryDetail: {
          marketCap: {
            fmt: '',
          },
          trailingPE: {
            fmt: '',
          },
          priceToSalesTrailing12Months: {
            fmt: '',
          },
        },
        insiderHolders: {},
        calendarEvents: {},
        upgradeDowngradeHistory: {},
        balanceSheetHistory: {},
        earningsTrend: {},
        secFilings: {},
        institutionOwnership: {},
        majorHoldersBreakdown: {},
        balanceSheetHistoryQuarterly: {},
        earningsHistory: {},
        majorDirectHolders: {},
        esgScores: {},
        netSharePurchaseActivity: {},
        insiderTransactions: {},
        sectorTrend: {},
        incomeStatementHistoryQuarterly: {},
        cashflowStatementHistoryQuarterly: {},
        earnings: {},
        financialData: {},
      },
    ],
    error: {},
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
        result: initialState.quoteSummaries.result,
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
