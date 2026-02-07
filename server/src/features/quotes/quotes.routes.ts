import { Router } from 'express';
import QuotesController from '@/features/quotes/quotes.controller';
import { Routes } from '@/types/routes.interface';

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
