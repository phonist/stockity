import { Router } from 'express';
import { CreateTickerDto } from '@/features/tickers/tickers.dtos';
import { Routes } from '@/types/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import {
  autocompleteHandler,
  createTickerHandler,
  deleteTickerHandler,
  getChartHandler,
  getTickerById,
  getTickers,
  updateTickerHandler,
} from '@/features/tickers/tickers.controller';

const router = Router();

router.get('/tickers', getTickers);
router.get('/tickers/:id', getTickerById);
router.post('/tickers', validationMiddleware(CreateTickerDto, 'body'), createTickerHandler);
router.put('/tickers/:id', validationMiddleware(CreateTickerDto, 'body', true), updateTickerHandler);
router.delete('/tickers/:id', deleteTickerHandler);
router.post('/tickers/getChart', getChartHandler);
router.post('/tickers/autocomplete', autocompleteHandler);

const tickersRoute: Routes = { path: '/tickers', router };

export default tickersRoute;
