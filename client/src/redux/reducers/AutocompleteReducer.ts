import {
    GET_AUTOCOMPLETE,
    ERROR_AUTOCOMPLETE,
    GetAutocompleteStateType,
    AutocompleteActionTypes,
    AutocompleteErrorActionTypes,
    AutocompleteSelectActionTypes,
    SELECT_AUTOCOMPLETE
} from '../types/AutocompleteTypes';

const initialStateGetAutocompletes: GetAutocompleteStateType = {
    autocompletes: {
        ResultSet: {
            Query: '',
            Result: [
                {
                    symbol: '',
                    name: '',
                    exch: '',
                    type: '',
                    exchDisp: '',
                    typeDisp: '',
                },
            ]
        },
        error: {
            result: null,
            error: {
                code: '',
                description: '',
            },
        },
    },
    loading: true,
    error: true,
    empty: true
};

export const getAutocompletesReducer = (
    state = initialStateGetAutocompletes,
    action: AutocompleteActionTypes|AutocompleteErrorActionTypes|AutocompleteSelectActionTypes,
): GetAutocompleteStateType => {
    switch (action.type) {
        case GET_AUTOCOMPLETE:
            return {
                ...state,
                autocompletes: {
                    ResultSet: action.payload.ResultSet == null ? initialStateGetAutocompletes.autocompletes.ResultSet : action.payload.ResultSet,
                    error: action.payload.error == null ? initialStateGetAutocompletes.autocompletes.error : action.payload.error,
                },
                loading: false,
                error: false,
                empty: false,
            };
        case SELECT_AUTOCOMPLETE:
            return {
                ...state,
                autocompletes: action.payload,
                loading: false,
                error: false,
                empty: false,
            };
        case ERROR_AUTOCOMPLETE:
            return {
                ...state,
                autocompletes: initialStateGetAutocompletes.autocompletes,
                loading: false,
                error: true,
                empty: true,
            };
        default:
            return state;
    }
}