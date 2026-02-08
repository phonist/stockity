import quoteModel from '@/models/quotes.model';
import { GetTickerQuote, PostTickerQuote } from '@/features/quotes/quotes.interfaces';
import yahooRepository from '@/features/tickers/repositories/yahoo.repository';

const quotes = quoteModel;
const yahoo = new yahooRepository();

const getQuote = async (req: PostTickerQuote): Promise<PostTickerQuote> => {
  // const getTickerQuote: GetTickerQuote = await yahoo.findQuote(req);
  // const model = {
  //   timestamp: getTickerQuote.result[0].regularMarketTime,
  //   name: getTickerQuote.result[0].symbol,
  //   meta: getTickerQuote.result[0],
  // };
  // const quotes: GetTickerQuote = await quotes.create(model);
  // return quotes;
  return await yahoo.findQuote(req);
};

export { getQuote };
