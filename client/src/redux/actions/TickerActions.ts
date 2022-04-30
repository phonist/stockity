import { GET_TICKERS, ERROR_TICKERS, TickerActionTypes, TickerErrorActionTypes } from "../types/TickerTypes";
import { Ticker } from "../interfaces/Ticker";

export const getTickersAction = (tickers: Ticker): TickerActionTypes => ({
    type: GET_TICKERS,
    payload: tickers,
});

export const errorTickerAction = (error: Ticker): TickerErrorActionTypes => ({
    type: ERROR_TICKERS,
    payload: error,
});