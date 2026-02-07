import { Dispatch } from "redux";
import { getQuotes } from "../../api/quote";
import { setQuotes, setQuoteError } from "../quotesSlice";

export const attemptGetQuotes = (params:any) => async (dispatch: Dispatch) => {
    const quotes = await getQuotes(params)
        .then(response => {
            dispatch(setQuotes(response.data));
        })
        .catch(error => {
            dispatch(setQuoteError(error));
        });

}
