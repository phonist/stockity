import { GET_INSIGHTS, ERROR_INSIGHTS, InsightActionTypes, InsightErrorActionTypes } from "../types/InsightTypes";
import { Insight } from "../interfaces/Insight";

export const getInsightsAction = (insights: Insight): InsightActionTypes => ({
    type: GET_INSIGHTS,
    payload: insights,
});

export const errorInsightsAction = (error: Insight): InsightErrorActionTypes => ({
    type: ERROR_INSIGHTS,
    payload: error,
});