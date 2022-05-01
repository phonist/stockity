
import { Dispatch } from "redux";
import { getAutocomplete } from '../../api/autocomplete';
import { getAutocompleteAction, errorAutocompleteAction, selectAutocompleteAction } from '../actions/AutocompleteActions';
import { AutocompleteActionTypes, AutocompleteErrorActionTypes, AutocompleteSelectActionTypes } from '../types/AutocompleteTypes';

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

export const attemptSelectAutocomplete = () => async (dispatch: Dispatch<AutocompleteSelectActionTypes>) => {
    dispatch(selectAutocompleteAction());
}