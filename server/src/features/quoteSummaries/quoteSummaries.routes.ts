import { Router } from 'express';
import QuoteSummariesController from '@/features/quoteSummaries/quoteSummaries.controller';
import { Routes } from '@/types/routes.interface';

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
