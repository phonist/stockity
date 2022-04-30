import { getInsightsAction, errorInsightsAction } from "../actions/InsightActions";
import { Dispatch } from "redux";
import { InsightActionTypes, InsightErrorActionTypes } from "../types/InsightTypes";
import { getInsights } from "../../api/insight";

export const attemptGetInsights = (params:any) => async (dispatch: Dispatch<InsightActionTypes|InsightErrorActionTypes>) => {
    const insights = await getInsights(params)
        .then(response => {
            dispatch(getInsightsAction(response.data));
        })
        .catch(error => {
            dispatch(errorInsightsAction(error));
        }); 
}