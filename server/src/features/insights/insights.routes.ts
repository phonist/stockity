import { Router } from 'express';
import InsightsController from '@/features/insights/insights.controller';
import { Routes } from '@/types/routes.interface';

class InsightsRoute implements Routes {
  public path = '/insights';
  public router = Router();
  public insightsController = new InsightsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/getInsight`, this.insightsController.getInsight);
  }
}

export default InsightsRoute;
