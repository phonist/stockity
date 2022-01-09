import { Quote } from '../interfaces/Quote'

export const GET_QUOTES = 'GET_QUOTES';

export interface GetQuotesStateType {
    quotes: Quote;
}

interface GetQuotesActionType {
    type: typeof GET_QUOTES;
    payload: Quote;
}

export type QuoteActionTypes = GetQuotesActionType;