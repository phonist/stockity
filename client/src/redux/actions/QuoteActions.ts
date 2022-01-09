import { GET_QUOTES, QuoteActionTypes } from "../types/QuoteTypes";
import { Quote } from "../interfaces/Quote";

export const getQuotesAction = (quotes: Quote): QuoteActionTypes => ({
    type: GET_QUOTES,
    payload: quotes,
});