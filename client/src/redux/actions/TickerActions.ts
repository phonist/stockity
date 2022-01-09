import { GET_TICKERS, TickerActionTypes } from "../types/TickerTypes";
import { Ticker } from "../interfaces/Ticker";

export const getTickersAction = (tickers: Ticker): TickerActionTypes => ({
    type: GET_TICKERS,
    payload: tickers,
});