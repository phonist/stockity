import { Insight, PostInsight } from '../interfaces/Insight'

export const GET_INSIGHTS = 'GET_INSIGHTS';
export const ERROR_INSIGHTS = 'ERROR_INSIGHTS';
export const POST_INSIGHTS = 'POST_INSIGHTS';

export interface GetInsightsStateType {
    postInsights: PostInsight;
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

interface PostInsightsActionType {
    type: typeof POST_INSIGHTS;
    payload: PostInsight;
}

export type InsightPostActionTypes = PostInsightsActionType;

interface GetInsightsErrorActionType {
    type: typeof ERROR_INSIGHTS;
    payload: Insight;
}

export type InsightErrorActionTypes = GetInsightsErrorActionType;