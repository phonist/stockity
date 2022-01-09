import request from 'superagent';
import { handleSuccess, handleError } from '../utils/api';

const apiURL = process.env.API_URL || 'http://localhost:8080';

export const getQuoteSummaries = (params:any) => 
  request.post(`${apiURL}/quoteSummaries/getQuoteSummary`)
    .send(params)
    .then(handleSuccess)
    .catch(handleError);