import React, { useEffect, useState } from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { attemptGetAutocomplete, attemptSelectAutocomplete } from '../../redux/thunks/Autocomplete';

const drawerWidth: number = 240;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Navigation(props:any) {
  const {
    open,
    toggleDrawer,
  } = props;

  const dispatch = useDispatch();
  const autocompletes = useSelector((state:AppState) => state.autocompletes);
  const [ defaultProps, setDefaultProps ] = useState({
    options: autocompletes.autocompletes.ResultSet.Result,
    getOptionLabel: (option) => option.symbol,
  });

  useEffect(() => {
      if(!autocompletes.loading) {
        setDefaultProps({
          options: autocompletes.autocompletes.ResultSet.Result,
          getOptionLabel: (option) => option.symbol,
        });
      }
  }, [autocompletes.loading, autocompletes.empty, autocompletes.error]);
  
  function onInputChange(event:any, value:any) {
    console.log('onInputChange', event, value);
    dispatch(attemptGetAutocomplete(value));
  }

  function onChange(event:any, newValue:any) {
    console.log('onChange', event, newValue);
    if(newValue) {
      autocompletes.autocompletes.ResultSet.Query = newValue.symbol;
      autocompletes.autocompletes.ResultSet.Result = [newValue];
    }
    dispatch(attemptSelectAutocomplete(autocompletes.autocompletes));
  }

  return (
    <AppBar position="absolute">
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Stockity
        </Typography>
        
        <Autocomplete
          {...defaultProps}
          id="clear-on-escape"
          clearOnEscape
          sx={{ width: 300 }}
          onInputChange={onInputChange}
          loadingText="Loading..."
          onChange={onChange}
          renderInput={(params) => <TextField {...params} label="stock" variant="standard" />}
        />

      </Toolbar>
    </AppBar>
  )
}