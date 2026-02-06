import { Router } from 'express';
import TradingController from '@controllers/trading.controller';
import { CashAdjustmentDto, CreateTradeDto } from '@dtos/trading.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class TradingRoute implements Routes {
  public path = '/trading';
  public router = Router();
  public tradingController = new TradingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/portfolio`, this.tradingController.getPortfolio);
    this.router.get(`${this.path}/positions`, this.tradingController.getPositions);
    this.router.get(`${this.path}/trades`, this.tradingController.getTrades);
    this.router.post(`${this.path}/trades`, validationMiddleware(CreateTradeDto, 'body'), this.tradingController.createTrade);
    this.router.post(`${this.path}/deposit`, validationMiddleware(CashAdjustmentDto, 'body'), this.tradingController.deposit);
    this.router.post(`${this.path}/withdraw`, validationMiddleware(CashAdjustmentDto, 'body'), this.tradingController.withdraw);
  }
}

export default TradingRoute;
