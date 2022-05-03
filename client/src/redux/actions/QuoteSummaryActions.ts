import { GET_QUOTESUMMARIES, ERROR_QUOTESUMMARIES, POST_QUOTESUMMARIES, QuoteSummaryActionTypes, QuoteSummaryErrorActionTypes, QuoteSummaryPostActionTypes } from "../types/QuoteSummaryTypes";
import { QuoteSummary, PostQuoteSummary } from "../interfaces/QuoteSummary";

export const getQuoteSummariesAction = (quoteSummaries: QuoteSummary): QuoteSummaryActionTypes => ({
    type: GET_QUOTESUMMARIES,
    payload: quoteSummaries,
});

export const errorQuoteSummariesAction = (error: QuoteSummary): QuoteSummaryErrorActionTypes => ({
    type: ERROR_QUOTESUMMARIES,
    payload: error,
});

export const updateQuoteSummary = (postQuoteSummary: PostQuoteSummary): QuoteSummaryPostActionTypes => ({
    type: POST_QUOTESUMMARIES,
    payload: postQuoteSummary,
});