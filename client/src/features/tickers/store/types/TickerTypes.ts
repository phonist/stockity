import { Ticker, PostTicker } from '../interfaces/Ticker'

export const GET_TICKERS = 'GET_TICKERS';
export const ERROR_TICKERS = 'ERROR_TICKERS';
export const POST_TICKERS = 'POST_TICKERS';

export interface GetTickersStateType {
    postTicker: PostTicker;
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

interface PostTickerActionType {
    type: typeof POST_TICKERS;
    payload: PostTicker;
}

export type TickerPostActionTypes = PostTickerActionType;

interface GetTickersErrorActionType {
    type: typeof ERROR_TICKERS;
    payload: Ticker;
}

export type TickerErrorActionTypes = GetTickersErrorActionType;