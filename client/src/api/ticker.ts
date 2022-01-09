import request from 'superagent';
import { handleSuccess, handleError } from '../utils/api';

const apiURL = process.env.API_URL || 'http://localhost:8080';

export const getTickers = (params:any) => 
  request.post(`${apiURL}/tickers/getChart`)
    .send(params)
    .then(handleSuccess)
    .catch(handleError);