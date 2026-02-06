import request from 'superagent';
import { handleSuccess, handleError } from '../utils/api';

const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

export const getPortfolio = () =>
  request.get(`${apiURL}/trading/portfolio`).then(handleSuccess).catch(handleError);

export const getPositions = () =>
  request.get(`${apiURL}/trading/positions`).then(handleSuccess).catch(handleError);

export const getTrades = () =>
  request.get(`${apiURL}/trading/trades`).then(handleSuccess).catch(handleError);

export const createTrade = (params: { symbol: string; side: 'buy' | 'sell'; quantity: number; price: number }) =>
  request.post(`${apiURL}/trading/trades`).send(params).then(handleSuccess).catch(handleError);

export const depositCash = (params: { amount: number }) =>
  request.post(`${apiURL}/trading/deposit`).send(params).then(handleSuccess).catch(handleError);

export const withdrawCash = (params: { amount: number }) =>
  request.post(`${apiURL}/trading/withdraw`).send(params).then(handleSuccess).catch(handleError);
