import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { GetQuotesStateType } from './types/QuoteTypes';
import type { PostQuote, Quote } from './interfaces/Quote';

const initialState: GetQuotesStateType = {
  postQuote: {
    region: 'US',
    lang: 'en',
    symbols: 'AAPL',
  },
  quotes: {
    data: [
      {
        adj_close: 0,
        adj_high: 0,
        adj_low: 0,
        adj_open: 0,
        adj_volume: 0,
        close: 0,
        date: '',
        dividend: 0,
        exchange: '',
        high: 0,
        low: 0,
        open: 0,
        split_factor: 1,
        symbol: '',
        volume: 0,
      },
    ],
    pagination: {
      limit: 0,
      offset: 0,
      count: 0,
      total: 0,
    },
    error: {},
  },
  loading: true,
  error: {},
  empty: true,
};

const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    setQuotes(state, action: PayloadAction<Quote>) {
      state.quotes = action.payload;
      state.loading = false;
      state.error = action.payload.error;
      state.empty = false;
    },
    setPostQuote(state, action: PayloadAction<PostQuote>) {
      state.postQuote = action.payload;
      state.loading = true;
      state.error = {};
      state.empty = true;
    },
    setQuoteError(state, action: PayloadAction<any>) {
      state.quotes = {
        data: initialState.quotes.data,
        pagination: initialState.quotes.pagination,
        error: action.payload,
      };
      state.loading = false;
      state.error = true;
      state.empty = true;
    },
  },
});

export const { setQuotes, setPostQuote, setQuoteError } = quotesSlice.actions;
export default quotesSlice.reducer;
