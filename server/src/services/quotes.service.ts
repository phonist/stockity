import quoteModel from '@/models/quotes.model';
import { GetTickerQuote, PostTickerQuote } from '@interfaces/quotes.interface';
import yahooRepository from '@repositories/yahoo.repository';

class QuoteService {
  public quotes = quoteModel;
  public yahoo = new yahooRepository();

  public async getQuote(req: PostTickerQuote): Promise<PostTickerQuote> {
    const getTickerQuote: GetTickerQuote = await this.yahoo.findQuote(req);
    const model = {
      timestamp: getTickerQuote.result[0].regularMarketTime,
      name: getTickerQuote.result[0].symbol,
      meta: getTickerQuote.result[0],
    };
    const quotes: GetTickerQuote = await this.quotes.create(model);
    return quotes;
  }
}

export default QuoteService;
