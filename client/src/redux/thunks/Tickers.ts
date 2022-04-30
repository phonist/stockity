import { getTickersAction, errorTickerAction } from "../actions/TickerActions";
import { Dispatch } from "redux";
import { TickerActionTypes, TickerErrorActionTypes } from "../types/TickerTypes";
import { getTickers } from "../../api/ticker";

export const attemptGetTickers = (params:any) => async (dispatch: Dispatch<TickerActionTypes | TickerErrorActionTypes>) => {
    const tickers = await getTickers(params)
        .then(response => {
            dispatch(getTickersAction(response.data));
        })
        .catch(error => {
            dispatch(errorTickerAction(error));
        });
}