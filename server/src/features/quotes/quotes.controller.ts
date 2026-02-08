import { NextFunction, Request, Response } from 'express';
import { GetTickerQuote } from '@/features/quotes/quotes.interfaces';
import { getQuote } from '@/features/quotes/quotes.service';

const getQuoteHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: GetTickerQuote = await getQuote(req.body);
    res.status(200).json({ data: result, message: 'getQuote' });
  } catch (error) {
    next(error);
  }
};

export { getQuoteHandler };
