import request from 'superagent';
import { handleSuccess, handleError } from '../../shared/utils/api';

const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const getAutocomplete = (params:any) => 
  request.post(`${apiURL}/autocomplete/getAutocomplete`)
    .send(params)
    .then(handleSuccess)
    .catch(handleError);