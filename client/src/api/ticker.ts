import request from 'superagent';
import { handleSuccess, handleError } from '../utils/api';

const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

export const getTickers = (params:any) => 
  request.post(`${apiURL}/tickers/getChart`)
    .send(params)
    .then(handleSuccess)
    .catch(handleError);