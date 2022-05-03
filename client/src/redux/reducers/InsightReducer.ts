import {
    GET_INSIGHTS,
    GetInsightsStateType,
    InsightActionTypes,
    InsightErrorActionTypes,
    InsightPostActionTypes,
    ERROR_INSIGHTS,
    POST_INSIGHTS,
} from '../types/InsightTypes';

const initialStateGetInsights: GetInsightsStateType = {
    postInsights: {
        symbol: 'AAPL',
    },
    insights: {
        result: {
            symbol: '',
            instrumentInfo: {},
            reports: [{}],
            companySnapshot: {},
        },
        error: {},
    },
    loading: true,
    error: {},
    empty: true
};

export const getInsightsReducer = (
    state = initialStateGetInsights,
    action: InsightActionTypes|InsightErrorActionTypes|InsightPostActionTypes,
): GetInsightsStateType => {
    switch (action.type) {
        case GET_INSIGHTS:
            return {
                ...state,
                insights: action.payload,
                loading: false,
                error: action.payload.error,
                empty: false
            };
        case POST_INSIGHTS:
            return {
                ...state,
                postInsights: action.payload,
                loading: true,
                error: true,
                empty: true
            };
        case ERROR_INSIGHTS:
            return {
                ...state,
                insights: {
                    result: initialStateGetInsights.insights.result,
                    error: action.payload,
                },
                loading: false,
                error: true,
                empty: true
            };
        default:
            return state;
    }
}