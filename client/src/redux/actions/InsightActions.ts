import { GET_INSIGHTS, InsightActionTypes } from "../types/InsightTypes";
import { Insight } from "../interfaces/Insight";

export const getInsightsAction = (insights: Insight): InsightActionTypes => ({
    type: GET_INSIGHTS,
    payload: insights,
});