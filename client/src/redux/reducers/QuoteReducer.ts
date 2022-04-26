import {
    GET_QUOTES,
    GetQuotesStateType,
    QuoteActionTypes,
} from '../types/QuoteTypes';

const initialStateGetQuotes: GetQuotesStateType = {
    quotes: {
        _id: '',
        timestamp: new Date(),
        name: '',
        meta: {}
    },
    loading: true,
    error: null,
    empty: true,
};

export const getQuotesReducer = (
    state = initialStateGetQuotes,
    action: QuoteActionTypes,
): GetQuotesStateType => {
    switch (action.type) {
        case GET_QUOTES:
            return {
                ...state,
                quotes: action.payload,
                loading: false,
                error: null,
                empty: false,
            };
        default:
            return state;
    }
}