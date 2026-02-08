import { NextFunction, Request, Response } from 'express';
import { GetQuoteSummary } from '@/features/quoteSummaries/quoteSummaries.interfaces';
import { getQuoteSummary } from '@/features/quoteSummaries/quoteSummaries.service';

const getQuoteSummaryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: GetQuoteSummary = await getQuoteSummary(req.body);
    res.status(200).json({ data: result, message: 'getQuoteSummary' });
  } catch (error) {
    next(error);
  }
};

export { getQuoteSummaryHandler };
