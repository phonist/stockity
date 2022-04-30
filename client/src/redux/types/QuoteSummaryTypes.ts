import { QuoteSummary } from '../interfaces/QuoteSummary'

export const GET_QUOTESUMMARIES= 'GET_QUOTESUMMARIES';
export const ERROR_QUOTESUMMARIES = 'ERROR_QUOTESUMMARIES';

export interface GetQuoteSummariesStateType {
    quoteSummaries: QuoteSummary;
    loading: boolean;
    error: any;
    empty: boolean;
}

interface GetQuoteSummariesActionType {
    type: typeof GET_QUOTESUMMARIES;
    payload: QuoteSummary;
}

export type QuoteSummaryActionTypes = GetQuoteSummariesActionType;

interface ErrorQuoteSummariesActionType {
    type: typeof ERROR_QUOTESUMMARIES;
    payload: QuoteSummary;
}

export type QuoteSummaryErrorActionTypes = ErrorQuoteSummariesActionType;