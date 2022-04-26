import {
    GET_INSIGHTS,
    GetInsightsStateType,
    InsightActionTypes,
} from '../types/InsightTypes';

const initialStateGetInsights: GetInsightsStateType = {
    insights: {
        _id: '',
        timestamp: new Date(),
        name: '',
        meta: {},
    },
    loading: true,
    error: null,
    empty: true
};

export const getInsightsReducer = (
    state = initialStateGetInsights,
    action: InsightActionTypes,
): GetInsightsStateType => {
    switch (action.type) {
        case GET_INSIGHTS:
            return {
                ...state,
                insights: action.payload,
                loading: false,
                error: null,
                empty: false
            };
        default:
            return state;
    }
}