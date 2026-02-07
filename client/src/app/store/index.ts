import { configureStore } from '@reduxjs/toolkit';
import tickersReducer from '../../features/tickers/store/tickersSlice';
import quotesReducer from '../../features/quotes/store/quotesSlice';
import quoteSummariesReducer from '../../features/quoteSummaries/store/quoteSummariesSlice';
import insightsReducer from '../../features/insights/store/insightsSlice';
import autocompletesReducer from '../../features/autocompletes/store/autocompletesSlice';

export const store = configureStore({
  reducer: {
    tickers: tickersReducer,
    quotes: quotesReducer,
    quoteSummaries: quoteSummariesReducer,
    insights: insightsReducer,
    autocompletes: autocompletesReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
