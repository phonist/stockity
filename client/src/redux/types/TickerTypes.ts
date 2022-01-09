import { Ticker } from '../interfaces/Ticker'

export const GET_TICKERS = 'GET_TICKERS';

export interface GetTickersStateType {
    tickers: Ticker;
}

interface GetTickersActionType {
    type: typeof GET_TICKERS;
    payload: Ticker;
}

export type TickerActionTypes = GetTickersActionType;