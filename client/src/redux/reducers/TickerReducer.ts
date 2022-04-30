import {
    GET_TICKERS,
    GetTickersStateType,
    TickerActionTypes,
    TickerErrorActionTypes,
    ERROR_TICKERS,
} from '../types/TickerTypes';

const initialStateGetTickers: GetTickersStateType = {
    tickers: {
        result: {
            meta: {
                symbol: '',
            },
            indicators: {
                quote: [
                    {
                        open: [],
                        high: [],
                        low: [],
                        close: [],
                    }
                ]
            },
            timestamp: [],
        },
        error: {},
    },
    loading: true,
    error: {},
    empty: true,
};

export const getTickersReducer = (
    state = initialStateGetTickers,
    action: TickerActionTypes | TickerErrorActionTypes
): GetTickersStateType => {
    switch (action.type) {
        case GET_TICKERS:
            return {
                ...state,
                tickers: action.payload,
                loading: false,
                error: false,
                empty: false,
            };
        case ERROR_TICKERS:
            return {
                ...state,
                tickers: {
                    result: initialStateGetTickers.tickers.result,
                    error: action.payload,
                },
                loading: false,
                empty: true,
                error: true,
            };
        default:
            return state;
    }
}