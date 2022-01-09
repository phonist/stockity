import {
    GET_QUOTESUMMARIES,
    GetQuoteSummariesStateType,
    QuoteSummaryActionTypes,
} from '../types/QuoteSummaryTypes';

const initialStateGetQuoteSummaries: GetQuoteSummariesStateType = {
    quoteSummaries: [],
};

export const getQuoteSummariesReducer = (
    state = initialStateGetQuoteSummaries,
    action: QuoteSummaryActionTypes,
): GetQuoteSummariesStateType => {
    switch (action.type) {
        case GET_QUOTESUMMARIES:
            return {
                ...state,
                quoteSummaries: action.payload,
            };
        default:
            return state;
    }
}