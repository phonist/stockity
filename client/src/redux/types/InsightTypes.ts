import { Insight } from '../interfaces/Insight'

export const GET_INSIGHTS = 'GET_INSIGHTS';

export interface GetInsightsStateType {
    insights: Insight;
}

interface GetInsightsActionType {
    type: typeof GET_INSIGHTS;
    payload: Insight;
}

export type InsightActionTypes = GetInsightsActionType;