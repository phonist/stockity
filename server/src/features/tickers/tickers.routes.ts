import { Router } from 'express';
import TickersController from '@/features/tickers/tickers.controller';
import { CreateTickerDto } from '@/features/tickers/tickers.dtos';
import { Routes } from '@/types/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class TickersRoute implements Routes {
  public path = '/tickers';
  public router = Router();
  public tickersController = new TickersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.tickersController.getTickers);
    this.router.get(`${this.path}/:id`, this.tickersController.getTickerById);
    this.router.post(`${this.path}`, validationMiddleware(CreateTickerDto, 'body'), this.tickersController.createTicker);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateTickerDto, 'body', true), this.tickersController.updateTicker);
    this.router.delete(`${this.path}/:id`, this.tickersController.deleteTicker);
    this.router.post(`${this.path}/getChart`, this.tickersController.getChart);
    this.router.post(`${this.path}/autocomplete`, this.tickersController.autocomplete);
  }
}

export default TickersRoute;
