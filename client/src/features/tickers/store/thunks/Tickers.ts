import { Dispatch } from "redux";
import { getTickers } from "../../api/ticker";
import { setTickers, setTickerError } from "../tickersSlice";

export const attemptGetTickers = (params:any) => async (dispatch: Dispatch) => {
    const tickers = await getTickers(params)
        .then(response => {
            dispatch(setTickers(response.data));
        })
        .catch(error => {
            dispatch(setTickerError(error));
        });
}
