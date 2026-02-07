import { Dispatch } from "redux";
import { getInsights } from "../../api/insight";
import { setInsights, setInsightsError } from "../insightsSlice";

export const attemptGetInsights = (params:any) => async (dispatch: Dispatch) => {
    const insights = await getInsights(params)
        .then(response => {
            dispatch(setInsights(response.data));
        })
        .catch(error => {
            dispatch(setInsightsError(error));
        });
}
