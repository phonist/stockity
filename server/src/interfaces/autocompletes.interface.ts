export interface Autocomplete {
  query: string;
  result: Array<AutocompleteStock>;
}

export interface PostAutocomplete {
  symbol: string;
}

export interface GetAutocomplete {
  query: string;
  result: Array<AutocompleteStock>;
}

interface AutocompleteStock {
  symbol: string;
  name: string;
  exch: string;
  type: string;
  exchDisp: string;
  typeDisp: string;
}
