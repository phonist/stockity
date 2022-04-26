import {
    GET_QUOTESUMMARIES,
    GetQuoteSummariesStateType,
    QuoteSummaryActionTypes,
} from '../types/QuoteSummaryTypes';

const initialStateGetQuoteSummaries: GetQuoteSummariesStateType = {
    quoteSummaries: {
        _id: '',
        timestamp: new Date(),
        name: '',
        meta: {}
    },
    loading: true,
    error: null,
    empty: true,
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
                loading: false,
                error: null,
                empty: false,
            };
        default:
            return state;
    }
}