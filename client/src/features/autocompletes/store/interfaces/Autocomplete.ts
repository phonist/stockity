export interface Autocomplete {
    ResultSet: AutocompleteResultSet;
    error: AutocompleteError;
}

interface AutocompleteError {
    result: null;
    error: {
        code: string;
        description: string;
    };
}

interface AutocompleteResultSet {
    Query: string;
    Result: Array<AutocompleteState>;
}

interface AutocompleteState {
    symbol: string;
    name: string;
    exch: string;
    type: string;
    exchDisp: string;
    typeDisp: string;
}