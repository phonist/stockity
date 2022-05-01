import { GET_AUTOCOMPLETE, ERROR_AUTOCOMPLETE, SELECT_AUTOCOMPLETE, AutocompleteActionTypes, AutocompleteErrorActionTypes, AutocompleteSelectActionTypes } from '../types/AutocompleteTypes';
import { Autocomplete } from '../interfaces/Autocomplete';

export const getAutocompleteAction = (autocomplete: Autocomplete ): AutocompleteActionTypes => ({
    type: GET_AUTOCOMPLETE,
    payload: autocomplete,
});

export const errorAutocompleteAction = (error: Autocomplete ): AutocompleteErrorActionTypes => ({
    type: ERROR_AUTOCOMPLETE,
    payload: error,
});

export const selectAutocompleteAction = (): AutocompleteSelectActionTypes => ({
    type: SELECT_AUTOCOMPLETE,
});