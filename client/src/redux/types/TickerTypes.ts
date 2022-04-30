import { Ticker } from '../interfaces/Ticker'

export const GET_TICKERS = 'GET_TICKERS';
export const ERROR_TICKERS = 'ERROR_TICKERS';

export interface GetTickersStateType {
    tickers: Ticker;
    loading: boolean;
    error: any;
    empty: boolean;
}

interface GetTickersActionType {
    type: typeof GET_TICKERS;
    payload: Ticker;
}

export type TickerActionTypes = GetTickersActionType;

interface GetTickersErrorActionType {
    type: typeof ERROR_TICKERS;
    payload: Ticker;
}

export type TickerErrorActionTypes = GetTickersErrorActionType;