import {
    GET_TICKERS,
    GetTickersStateType,
    TickerActionTypes,
    TickerErrorActionTypes,
    ERROR_TICKERS,
    POST_TICKERS,
    TickerPostActionTypes,
} from '../types/TickerTypes';

const initialStateGetTickers: GetTickersStateType = {
    postTicker: {
        range: "1mo",
        region: "US",
        interval: "1d",
        lang: "en",
        ticker: "AAPL",
        events: "div"
    },
    tickers: {
        result: [{
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
        }],
        error: {},
    },
    loading: true,
    error: {},
    empty: true,
};

export const getTickersReducer = (
    state = initialStateGetTickers,
    action: TickerActionTypes | TickerErrorActionTypes | TickerPostActionTypes
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
        case POST_TICKERS:
            return {
                ...state,
                postTicker: action.payload,
                loading: true,
                error: false,
                empty: false,
            }
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