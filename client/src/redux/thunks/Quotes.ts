import { getQuotesAction, errorQuotesAction } from "../actions/QuoteActions";
import { Dispatch } from "redux";
import { QuoteActionTypes, QuoteErrorActionTypes } from "../types/QuoteTypes";
import { getQuotes } from "../../api/quote";

export const attemptGetQuotes = (params:any) => async (dispatch: Dispatch<QuoteActionTypes|QuoteErrorActionTypes>) => {
    const quotes = await getQuotes(params)
        .then(response => {
            dispatch(getQuotesAction(response.data));
        })
        .catch(error => {
            dispatch(errorQuotesAction(error));
        });

}