import { NextFunction, Request, Response } from 'express';
import { GetQuoteSummary } from '@/features/quoteSummaries/quoteSummaries.interfaces';
import quoteSummaryService from '@/features/quoteSummaries/quoteSummaries.service';

class QuoteSummariesController {
  public quoteSummaryService = new quoteSummaryService();

  public getQuoteSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getQuoteSummary: GetQuoteSummary = await this.quoteSummaryService.getQuoteSummary(req.body);
      res.status(200).json({ data: getQuoteSummary, message: 'getQuoteSummary' });
    } catch (error) {
      next(error);
    }
  };
}

export default QuoteSummariesController;
