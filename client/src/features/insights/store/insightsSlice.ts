import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { GetInsightsStateType } from './types/InsightTypes';
import type { Insight, PostInsight } from './interfaces/Insight';

const initialState: GetInsightsStateType = {
  postInsights: {
    symbol: 'AAPL',
  },
  insights: {
    result: {
      symbol: '',
      instrumentInfo: {},
      reports: [{}],
      companySnapshot: {},
    },
    error: {},
  },
  loading: true,
  error: {},
  empty: true,
};

const insightsSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {
    setInsights(state, action: PayloadAction<Insight>) {
      state.insights = action.payload;
      state.loading = false;
      state.error = action.payload.error;
      state.empty = false;
    },
    setPostInsights(state, action: PayloadAction<PostInsight>) {
      state.postInsights = action.payload;
      state.loading = true;
      state.error = true;
      state.empty = true;
    },
    setInsightsError(state, action: PayloadAction<any>) {
      state.insights = {
        result: initialState.insights.result,
        error: action.payload,
      };
      state.loading = false;
      state.error = true;
      state.empty = true;
    },
  },
});

export const { setInsights, setPostInsights, setInsightsError } = insightsSlice.actions;
export default insightsSlice.reducer;
