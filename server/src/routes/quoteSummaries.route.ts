import { Router } from 'express';
import QuoteSummariesController from '@controllers/quoteSummaries.controller';
import { Routes } from '@interfaces/routes.interface';

class QuoteSummariesRoute implements Routes {
  public path = '/quoteSummaries';
  public router = Router();
  public quoteSummariesController = new QuoteSummariesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/getQuoteSummary`, this.quoteSummariesController.getQuoteSummary);
  }
}

export default QuoteSummariesRoute;
