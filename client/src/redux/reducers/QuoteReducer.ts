import {
    GET_QUOTES,
    GetQuotesStateType,
    QuoteActionTypes,
    QuoteErrorActionTypes,
    QuotePostActionTypes,
    ERROR_QUOTES,
    POST_QUOTES,
} from '../types/QuoteTypes';

const initialStateGetQuotes: GetQuotesStateType = {
    postQuote: {
        region: 'US',
        lang: 'en',
        symbols: 'AAPL',
    },
    quotes: {
        result: [
            {
                symbol: '',
                regularMarketPrice: 0,
                regularMarketChange: 0,
                regularMarketChangePercent: 0,
                postMarketPrice: 0,
                postMarketChange: 0,
                postMarketChangePercent: 0,
            },
        ],
        error: {},
    },
    loading: true,
    error: {},
    empty: true,
};

export const getQuotesReducer = (
    state = initialStateGetQuotes,
    action: QuoteActionTypes | QuoteErrorActionTypes | QuotePostActionTypes,
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
        case POST_QUOTES:
            return {
                ...state,
                postQuote: action.payload,
                loading: true,
                error: {},
                empty: true,
            }
        case ERROR_QUOTES:
            return {
                ...state,
                quotes: {
                    result: initialStateGetQuotes.quotes.result,
                    error: action.payload,
                },
                loading: false,
                error: true,
                empty: true,
            };
        default:
            return state;
    }
}