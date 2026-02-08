import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { GetAutocompleteStateType } from './types/AutocompleteTypes';
import type { Autocomplete } from './interfaces/Autocomplete';

const initialState: GetAutocompleteStateType = {
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
      ],
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
  empty: true,
};

const autocompletesSlice = createSlice({
  name: 'autocompletes',
  initialState,
  reducers: {
    setAutocompletes(state, action: PayloadAction<Autocomplete>) {
      state.autocompletes = {
        ResultSet: action.payload.ResultSet == null ? initialState.autocompletes.ResultSet : action.payload.ResultSet,
        error: action.payload.error == null ? initialState.autocompletes.error : action.payload.error,
      };
      state.loading = false;
      state.error = false;
      state.empty = false;
    },
    selectAutocomplete(state, action: PayloadAction<Autocomplete>) {
      state.autocompletes = action.payload;
      state.loading = false;
      state.error = false;
      state.empty = false;
    },
    setAutocompleteError(state, action: PayloadAction<any>) {
      state.autocompletes = initialState.autocompletes;
      state.loading = false;
      state.error = true;
      state.empty = true;
    },
  },
});

export const { setAutocompletes, selectAutocomplete, setAutocompleteError } = autocompletesSlice.actions;
export default autocompletesSlice.reducer;
