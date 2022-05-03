import { GET_QUOTES, ERROR_QUOTES, POST_QUOTES, QuoteActionTypes, QuoteErrorActionTypes, QuotePostActionTypes } from "../types/QuoteTypes";
import { Quote, PostQuote} from "../interfaces/Quote";

export const getQuotesAction = (quotes: Quote): QuoteActionTypes => ({
    type: GET_QUOTES,
    payload: quotes,
});

export const errorQuotesAction = (error: Quote): QuoteErrorActionTypes => ({
    type: ERROR_QUOTES,
    payload: error,
});

export const updateQuoteTicker = (postQuote: PostQuote): QuotePostActionTypes => ({
    type: POST_QUOTES,
    payload: postQuote,
});