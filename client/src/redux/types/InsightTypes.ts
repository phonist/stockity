import { Insight } from '../interfaces/Insight'

export const GET_INSIGHTS = 'GET_INSIGHTS';
export const ERROR_INSIGHTS = 'ERROR_INSIGHTS';

export interface GetInsightsStateType {
    insights: Insight;
    loading: boolean;
    error: any;
    empty: boolean;
}

interface GetInsightsActionType {
    type: typeof GET_INSIGHTS;
    payload: Insight;
}

export type InsightActionTypes = GetInsightsActionType;

interface GetInsightsErrorActionType {
    type: typeof ERROR_INSIGHTS;
    payload: Insight;
}

export type InsightErrorActionTypes = GetInsightsErrorActionType;