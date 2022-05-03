import { GET_INSIGHTS, ERROR_INSIGHTS, POST_INSIGHTS, InsightActionTypes, InsightErrorActionTypes, InsightPostActionTypes } from "../types/InsightTypes";
import { Insight, PostInsight } from "../interfaces/Insight";

export const getInsightsAction = (insights: Insight): InsightActionTypes => ({
    type: GET_INSIGHTS,
    payload: insights,
});

export const errorInsightsAction = (error: Insight): InsightErrorActionTypes => ({
    type: ERROR_INSIGHTS,
    payload: error,
});

export const updateInsights = (postInsight: PostInsight): InsightPostActionTypes => ({ 
    type: POST_INSIGHTS,
    payload: postInsight,
});