import { PostQuote, Quote } from '../interfaces/Quote'

export const GET_QUOTES = 'GET_QUOTES';
export const ERROR_QUOTES = 'ERROR_QUOTES';
export const POST_QUOTES = 'POST_QUOTES';

export interface GetQuotesStateType {
    postQuote: PostQuote;
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

interface PostQuoteActionType {
    type: typeof POST_QUOTES;
    payload: PostQuote;
}

export type QuotePostActionTypes = PostQuoteActionType;

interface ErrorQuotesActionType {
    type: typeof ERROR_QUOTES;
    payload: Quote;
}

export type QuoteErrorActionTypes = ErrorQuotesActionType;