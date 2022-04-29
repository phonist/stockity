import { getQuoteSummariesAction, errorQuoteSummariesAction } from "../actions/QuoteSummaryActions";
import { Dispatch } from "redux";
import { QuoteSummaryActionTypes, QuoteSummaryErrorActionTypes } from "../types/QuoteSummaryTypes";
import { getQuoteSummaries } from "../../api/quoteSummary";

export const attemptGetQuoteSummaries = (params:any) => async (dispatch: Dispatch<QuoteSummaryActionTypes|QuoteSummaryErrorActionTypes>) => {
    const quoteSummaries = await getQuoteSummaries(params)
        .then(response => {
            dispatch(getQuoteSummariesAction(response.data));
        })
        .catch(error => {
            dispatch(errorQuoteSummariesAction(error));
        });
}