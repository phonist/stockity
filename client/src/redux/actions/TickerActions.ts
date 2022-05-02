import { GET_TICKERS, ERROR_TICKERS, POST_TICKERS, TickerActionTypes, TickerPostActionTypes, TickerErrorActionTypes } from "../types/TickerTypes";
import { PostTicker, Ticker } from "../interfaces/Ticker";

export const getTickersAction = (tickers: Ticker): TickerActionTypes => ({
    type: GET_TICKERS,
    payload: tickers,
});

export const errorTickerAction = (error: Ticker): TickerErrorActionTypes => ({
    type: ERROR_TICKERS,
    payload: error,
});

export const updatePostTicker = (postTickers: PostTicker): TickerPostActionTypes => ({
    type: POST_TICKERS,
    payload: postTickers,
});