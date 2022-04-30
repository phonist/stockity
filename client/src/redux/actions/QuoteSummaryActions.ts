import { GET_QUOTESUMMARIES, ERROR_QUOTESUMMARIES, QuoteSummaryActionTypes, QuoteSummaryErrorActionTypes } from "../types/QuoteSummaryTypes";
import { QuoteSummary } from "../interfaces/QuoteSummary";

export const getQuoteSummariesAction = (quoteSummaries: QuoteSummary): QuoteSummaryActionTypes => ({
    type: GET_QUOTESUMMARIES,
    payload: quoteSummaries,
});

export const errorQuoteSummariesAction = (error: QuoteSummary): QuoteSummaryErrorActionTypes => ({
    type: ERROR_QUOTESUMMARIES,
    payload: error,
});