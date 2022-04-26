import {
    GET_TICKERS,
    GetTickersStateType,
    TickerActionTypes,
    TickerErrorActionTypes,
    ERROR_TICKERS,
} from '../types/TickerTypes';

const initialStateGetTickers: GetTickersStateType = {
    tickers: {
        _id: '',
        name: '',
        price: 0,
        datetime: new Date(),
        meta: {},
        indicators: {},
        timestamp: [],
    },
    loading: true,
    error: null,
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
                error: null,
                empty: false,
            };
        case ERROR_TICKERS:
            return {
                ...state,
                error: action.payload,
                loading: true,
                empty: true,
            };
        default:
            return state;
    }
}