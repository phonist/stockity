
import { Dispatch } from "redux";
import { getAutocomplete } from '../../api/autocomplete';
import { getAutocompleteAction, errorAutocompleteAction, selectAutocompleteAction } from '../actions/AutocompleteActions';
import { AutocompleteActionTypes, AutocompleteErrorActionTypes, AutocompleteSelectActionTypes } from '../types/AutocompleteTypes';
import { TickerPostActionTypes } from '../types/TickerTypes';
import { updatePostTicker } from '../actions/TickerActions';


export const attemptGetAutocomplete = (params:any) => async (dispatch: Dispatch<AutocompleteActionTypes | AutocompleteErrorActionTypes>) => {
    let postQuery = {
        query: params
    };
    const tickers = await getAutocomplete(postQuery)
        .then(response => {
            dispatch(getAutocompleteAction(response.data));
        })
        .catch(error => {
            dispatch(errorAutocompleteAction(error));
        });
}

export const attemptSelectAutocomplete = (params: any) => async (dispatch: Dispatch<AutocompleteSelectActionTypes|TickerPostActionTypes>) => {
    dispatch(selectAutocompleteAction(params));
    let postTicker = {
        range: "1mo",
        region: "US",
        interval: "1d",
        lang: "en",
        ticker: params.symbol,
    }
    dispatch(updatePostTicker(params));
}