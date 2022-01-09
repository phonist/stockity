import { Router } from 'express';
import TickersController from '@controllers/tickers.controller';
import { CreateTickerDto } from '@dtos/tickers.dto';
import { Routes } from '@interfaces/routes.interface';
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
