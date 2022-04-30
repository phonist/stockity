import { Quote } from '../interfaces/Quote'

export const GET_QUOTES = 'GET_QUOTES';
export const ERROR_QUOTES = 'ERROR_QUOTES';

export interface GetQuotesStateType {
    quotes: Quote;
    loading: boolean;
    error: any;
    empty: boolean;
}

interface GetQuotesActionType {
    type: typeof GET_QUOTES;
    payload: Quote;
}

export type QuoteActionTypes = GetQuotesActionType;

interface ErrorQuotesActionType {
    type: typeof ERROR_QUOTES;
    payload: Quote;
}

export type QuoteErrorActionTypes = ErrorQuotesActionType;