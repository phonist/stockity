import { GET_QUOTES, ERROR_QUOTES, QuoteActionTypes, QuoteErrorActionTypes } from "../types/QuoteTypes";
import { Quote } from "../interfaces/Quote";

export const getQuotesAction = (quotes: Quote): QuoteActionTypes => ({
    type: GET_QUOTES,
    payload: quotes,
});

export const errorQuotesAction = (error: any): QuoteErrorActionTypes => ({
    type: ERROR_QUOTES,
    payload: error,
});