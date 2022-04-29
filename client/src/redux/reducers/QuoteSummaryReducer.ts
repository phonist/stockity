import {
    GET_QUOTESUMMARIES,
    GetQuoteSummariesStateType,
    QuoteSummaryActionTypes,
    QuoteSummaryErrorActionTypes,
    ERROR_QUOTESUMMARIES,
} from '../types/QuoteSummaryTypes';

const initialStateGetQuoteSummaries: GetQuoteSummariesStateType = {
    quoteSummaries: {
        result: [],
        error: null,
    },
    loading: true,
    error: null,
    empty: true,
};

export const getQuoteSummariesReducer = (
    state = initialStateGetQuoteSummaries,
    action: QuoteSummaryActionTypes | QuoteSummaryErrorActionTypes,
): GetQuoteSummariesStateType => {
    switch (action.type) {
        case GET_QUOTESUMMARIES:
            return {
                ...state,
                quoteSummaries: action.payload,
                loading: false,
                error: action.payload.error,
                empty: false,
            };
        case ERROR_QUOTESUMMARIES:
            return {
                ...state,
                quoteSummaries: action.payload,
                loading: false,
                error: true,
                empty: true,
            };
        default:
            return state;
    }
}