import { NextFunction, Request, Response } from 'express';
import { GetInsight } from '@/interfaces/insights.interface';
import insightService from '@/services/insights.service';

class InsightsController {
  public insightService = new insightService();

  public getInsight = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getInsight: GetInsight = await this.insightService.getInsight(req.body);
      res.status(200).json({ data: getInsight, message: 'getInsight' });
    } catch (error) {
      next(error);
    }
  };
}

export default InsightsController;
