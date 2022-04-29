import {
    GET_QUOTES,
    GetQuotesStateType,
    QuoteActionTypes,
    QuoteErrorActionTypes,
    ERROR_QUOTES,
} from '../types/QuoteTypes';

const initialStateGetQuotes: GetQuotesStateType = {
    quotes: {
        result: [],
        error: null,
    },
    loading: true,
    error: null,
    empty: true,
};

export const getQuotesReducer = (
    state = initialStateGetQuotes,
    action: QuoteActionTypes | QuoteErrorActionTypes,
): GetQuotesStateType => {
    switch (action.type) {
        case GET_QUOTES:
            return {
                ...state,
                quotes: action.payload,
                loading: false,
                error: action.payload.error,
                empty: false,
            };
        case ERROR_QUOTES:
            console.log('reducers', action.payload);
            return {
                ...state,
                quotes: action.payload,
                loading: false,
                error: true,
                empty: true,
            };
        default:
            return state;
    }
}