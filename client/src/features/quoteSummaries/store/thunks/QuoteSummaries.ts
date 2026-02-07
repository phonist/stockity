import { Dispatch } from "redux";
import { getQuoteSummaries } from "../../api/quoteSummary";
import { setQuoteSummaries, setQuoteSummariesError } from "../quoteSummariesSlice";

export const attemptGetQuoteSummaries = (params:any) => async (dispatch: Dispatch) => {
    const quoteSummaries = await getQuoteSummaries(params)
        .then(response => {
            dispatch(setQuoteSummaries(response.data));
        })
        .catch(error => {
            dispatch(setQuoteSummariesError(error));
        });
}
