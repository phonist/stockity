import { QuoteSummary, PostQuoteSummary } from '../interfaces/QuoteSummary'

export const GET_QUOTESUMMARIES= 'GET_QUOTESUMMARIES';
export const ERROR_QUOTESUMMARIES = 'ERROR_QUOTESUMMARIES';
export const POST_QUOTESUMMARIES = 'POST_QUOTESUMMARIES';

export interface GetQuoteSummariesStateType {
    postQuoteSummaries: PostQuoteSummary;
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

interface PostQuoteSummariesActionType {
    type: typeof POST_QUOTESUMMARIES;
    payload: PostQuoteSummary;
}

export type QuoteSummaryPostActionTypes = PostQuoteSummariesActionType;

interface ErrorQuoteSummariesActionType {
    type: typeof ERROR_QUOTESUMMARIES;
    payload: QuoteSummary;
}

export type QuoteSummaryErrorActionTypes = ErrorQuoteSummariesActionType;