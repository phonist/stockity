import quoteModel from '@/models/quotes.model';
import { GetTickerQuote, PostTickerQuote } from '@/features/quotes/quotes.interfaces';
import marketStackRepository from '../tickers/repositories/marketStack.repository';

const quotes = quoteModel;
const marketStack = new marketStackRepository();

const getQuote = async (req: PostTickerQuote): Promise<PostTickerQuote> => {
  // const getTickerQuote: GetTickerQuote = await marketStack.findQuote(req);
  // const model = {
  //   timestamp: getTickerQuote.result[0].regularMarketTime,
  //   name: getTickerQuote.result[0].symbol,
  //   meta: getTickerQuote.result[0],
  // };
  // const quotes: GetTickerQuote = await quotes.create(model);
  // return quotes;
  return await marketStack.findQuote(req);
};

export { getQuote };
