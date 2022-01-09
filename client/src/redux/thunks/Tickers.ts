import { getTickersAction } from "../actions/TickerActions";
import { Dispatch } from "redux";
import { TickerActionTypes } from "../types/TickerTypes";
import { getTickers } from "../../api/ticker";

export const attemptGetTickers = (params:any) => async (dispatch: Dispatch<TickerActionTypes>) => {
    const tickers = await getTickers(params)
        .then(response => response.data)
        .catch(error => error);

    dispatch(getTickersAction(tickers));
}