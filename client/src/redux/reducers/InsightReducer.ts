import {
    GET_INSIGHTS,
    GetInsightsStateType,
    InsightActionTypes,
} from '../types/InsightTypes';

const initialStateGetInsights: GetInsightsStateType = {
    insights: {
        id: '',
        timestamp: new Date(),
        name: '',
        meta: {},
    },
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
            };
        default:
            return state;
    }
}