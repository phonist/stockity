import { NextFunction, Request, Response } from 'express';
import { GetTickerQuote } from '@/interfaces/quotes.interface';
import quoteService from '@/services/quotes.service';

class QuotesController {
  public quoteService = new quoteService();

  public getQuote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getQuote: GetTickerfQuote = await this.quoteService.getQuote(req.body);
      res.status(200).json({ data: getQuote, message: 'getQuote' });
    } catch (error) {
      next(error);
    }
  };
}

export default QuotesController;
