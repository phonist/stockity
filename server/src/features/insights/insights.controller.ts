import { NextFunction, Request, Response } from 'express';
import { GetInsight } from '@/features/insights/insights.interfaces';
import { getInsight } from '@/features/insights/insights.service';

const getInsightHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: GetInsight = await getInsight(req.body);
    res.status(200).json({ data: result, message: 'getInsight' });
  } catch (error) {
    next(error);
  }
};

export { getInsightHandler };
