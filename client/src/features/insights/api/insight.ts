import request from 'superagent';
import { handleSuccess, handleError } from '../../../shared/utils/api';

const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const getInsights = (params:any) => 
  request.post(`${apiURL}/insights/getInsight`)
    .send(params)
    .then(handleSuccess)
    .catch(handleError);