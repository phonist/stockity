import {
    GET_TICKERS,
    GetTickersStateType,
    TickerActionTypes,
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
};

export const getTickersReducer = (
    state = initialStateGetTickers,
    action: TickerActionTypes,
): GetTickersStateType => {
    switch (action.type) {
        case GET_TICKERS:
            return {
                ...state,
                tickers: action.payload,
            };
        default:
            return state;
    }
}