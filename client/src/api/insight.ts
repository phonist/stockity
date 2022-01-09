import request from 'superagent';
import { handleSuccess, handleError } from '../utils/api';

const apiURL = process.env.API_URL || 'http://localhost:8080';

export const getInsights = (params:any) => 
  request.post(`${apiURL}/insights/getInsight`)
    .send(params)
    .then(handleSuccess)
    .catch(handleError);