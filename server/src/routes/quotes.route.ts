import { Router } from 'express';
import QuotesController from '@controllers/quotes.controller';
import { Routes } from '@interfaces/routes.interface';

class QuotesRoute implements Routes {
  public path = '/quotes';
  public router = Router();
  public quotesController = new QuotesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/getQuote`, this.quotesController.getQuote);
  }
}

export default QuotesRoute;
