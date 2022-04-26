import { GET_QUOTESUMMARIES, QuoteSummaryActionTypes } from "../types/QuoteSummaryTypes";
import { QuoteSummary } from "../interfaces/QuoteSummary";

export const getQuoteSummariesAction = (quoteSummaries: QuoteSummary): QuoteSummaryActionTypes => ({
    type: GET_QUOTESUMMARIES,
    payload: quoteSummaries,
});