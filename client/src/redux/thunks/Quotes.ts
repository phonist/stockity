import { getQuotesAction } from "../actions/QuoteActions";
import { Dispatch } from "redux";
import { QuoteActionTypes } from "../types/QuoteTypes";
import { getQuotes } from "../../api/quote";

export const attemptGetQuotes = (params:any) => async (dispatch: Dispatch<QuoteActionTypes>) => {
    const quotes = await getQuotes(params)
        .then(response => response.data)
        .catch(error => error);

    dispatch(getQuotesAction(quotes));
}