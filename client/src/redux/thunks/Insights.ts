import { getInsightsAction } from "../actions/InsightActions";
import { Dispatch } from "redux";
import { InsightActionTypes } from "../types/InsightTypes";
import { getInsights } from "../../api/insight";

export const attemptGetInsights = (params:any) => async (dispatch: Dispatch<InsightActionTypes>) => {
    const insights = await getInsights(params)
        .then(response => response.data)
        .catch(error => error);

    dispatch(getInsightsAction(insights));
}