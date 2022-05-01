import { Autocomplete } from "../interfaces/Autocomplete";

export const GET_AUTOCOMPLETE = 'GET_AUTOCOMPLETE';
export const ERROR_AUTOCOMPLETE = 'ERROR_AUTOCOMPLETE';
export const SELECT_AUTOCOMPLETE = 'SELECT_AUTOCOMPLETE';

export interface GetAutocompleteStateType {
    autocompletes: Autocomplete;
    loading: boolean;
    error: boolean;
    empty: boolean;
    isSelect: boolean;
}

interface GetAutocompleteActionTypes {
    type: typeof GET_AUTOCOMPLETE;
    payload: Autocomplete;
}

export type AutocompleteActionTypes = GetAutocompleteActionTypes;

interface GetAutocompleteErrorActionTypes {
    type: typeof ERROR_AUTOCOMPLETE;
    payload: Autocomplete;
}

export type AutocompleteErrorActionTypes = GetAutocompleteErrorActionTypes;

interface SelectAutocompleteActionTypes {
    type: typeof SELECT_AUTOCOMPLETE;
}

export type AutocompleteSelectActionTypes = SelectAutocompleteActionTypes;


