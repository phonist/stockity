import { getQuoteSummariesAction } from "../actions/QuoteSummaryActions";
import { Dispatch } from "redux";
import { QuoteSummaryActionTypes } from "../types/QuoteSummaryTypes";
import { getQuoteSummaries } from "../../api/quoteSummary";

export const attemptGetQuoteSummaries = (params:any) => async (dispatch: Dispatch<QuoteSummaryActionTypes>) => {
    const quoteSummaries = await getQuoteSummaries(params)
        .then(response => response.data)
        .catch(error => error);

    dispatch(getQuoteSummariesAction(quoteSummaries));
}