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
    result: [
      {
        symbol: '',
        regularMarketPrice: 0,
        regularMarketChange: 0,
        regularMarketChangePercent: 0,
        postMarketPrice: 0,
        postMarketChange: 0,
        postMarketChangePercent: 0,
      },
    ],
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
        result: initialState.quotes.result,
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
