import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store';
import { attemptGetAutocomplete, attemptSelectAutocomplete } from '../../features/autocompletes/store/thunks/Autocomplete';

export default function Navigation() {
  const dispatch = useDispatch();
  const autocompletes = useSelector((state: AppState) => state.autocompletes);
  const [searchText, setSearchText] = useState('AAPL');
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    if (!autocompletes.loading) {
      const nextOptions = autocompletes.autocompletes.ResultSet.Result || [];
      setOptions(nextOptions.filter(item => item && item.symbol));
    }
  }, [autocompletes.loading, autocompletes.autocompletes.ResultSet.Result]);

  const onInputChange = (_event: any, value: string) => {
    setSearchText(value);
    if (value && value.trim().length > 0) {
      dispatch(attemptGetAutocomplete(value.trim()));
    }
  };

  const onChange = (_event: any, newValue: any) => {
    if (!newValue || !newValue.symbol) {
      return;
    }

    dispatch(
      attemptSelectAutocomplete({
        ResultSet: {
          Query: newValue.symbol,
          Result: [newValue],
        },
        error: autocompletes.autocompletes.error,
      }),
    );
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        mt: 2,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255,255,255,0.75)',
        border: '1px solid rgba(14,122,109,0.12)',
        borderRadius: 4,
      }}
    >
      <Toolbar sx={{ gap: 2, flexWrap: 'wrap', py: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, flexGrow: 1 }}>
          <TrendingUpIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Stockity
          </Typography>
          <Chip
            label="Live Market"
            size="small"
            sx={{ backgroundColor: 'rgba(14,122,109,0.12)', color: 'primary.main', fontWeight: 700 }}
          />
        </Box>

        <Autocomplete
          options={options}
          getOptionLabel={option => option.symbol || ''}
          filterOptions={x => x}
          value={null}
          inputValue={searchText}
          sx={{ width: { xs: '100%', sm: 320 } }}
          onInputChange={onInputChange}
          onChange={onChange}
          renderInput={params => (
            <TextField
              {...params}
              label="Search symbol"
              placeholder="AAPL, TSLA, NVDA"
              variant="outlined"
              size="small"
            />
          )}
        />
      </Toolbar>
    </AppBar>
  );
}
