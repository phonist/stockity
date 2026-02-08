import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { GetTickersStateType } from './types/TickerTypes';
import type { PostTicker, Ticker } from './interfaces/Ticker';

const initialState: GetTickersStateType = {
  postTicker: {
    range: '1mo',
    region: 'US',
    interval: '1d',
    lang: 'en',
    ticker: 'AAPL',
    events: 'div',
  },
  tickers: {
    result: [
      {
        meta: {
          symbol: '',
        },
        indicators: {
          quote: [
            {
              open: [],
              high: [],
              low: [],
              close: [],
            },
          ],
        },
        timestamp: [],
      },
    ],
    error: {},
  },
  loading: true,
  error: {},
  empty: true,
};

const tickersSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {
    setTickers(state, action: PayloadAction<Ticker>) {
      state.tickers = action.payload;
      state.loading = false;
      state.error = action.payload.error;
      state.empty = false;
    },
    setPostTicker(state, action: PayloadAction<PostTicker>) {
      state.postTicker = action.payload;
      state.loading = true;
      state.error = false;
      state.empty = false;
    },
    setTickerError(state, action: PayloadAction<any>) {
      state.tickers = {
        result: initialState.tickers.result,
        error: action.payload,
      };
      state.loading = false;
      state.error = true;
      state.empty = true;
    },
  },
});

export const { setTickers, setPostTicker, setTickerError } = tickersSlice.actions;
export default tickersSlice.reducer;
