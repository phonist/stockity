import { CreateTickerDto } from '@/features/tickers/tickers.dtos';
import { HttpException } from '@/utils/HttpException';
import { GetTickerChart, PostTickerChart, Ticker } from '@/features/tickers/tickers.interfaces';
import tickerModel from '@models/tickers.model';
import { isEmpty } from '@utils/util';
import marketStackRepository from '@/features/tickers/repositories/marketStack.repository';
import finhubRepository from '@/features/tickers/repositories/finhub.repository';

const tickers = tickerModel;
const marketStack = new marketStackRepository();
const finhub = new finhubRepository();

const findAllTicker = async (): Promise<Ticker[]> => {
  const result: Ticker[] = await tickers.find();
  return result;
};

const findTickerById = async (tickerId: string): Promise<Ticker> => {
  if (isEmpty(tickerId)) throw new HttpException(400, 'There are no ticker symbol provided');
  const findTicker: Ticker = await tickers.findOne({ _id: tickerId });
  // const findTicker: Ticker = await marketStack.findQuote(tickerId);

  if (!findTicker) throw new HttpException(409, 'Ticker not available');

  return findTicker;
};

const createTicker = async (tickerData: CreateTickerDto): Promise<Ticker> => {
  if (isEmpty(tickerData)) throw new HttpException(400, "You're not tickerData");

  const checkTicker: Ticker = await tickers.findOne({ name: tickerData.name });

  if (checkTicker) throw new HttpException(409, `The ticker ${tickerData.name} already exists`);

  // const findTicker: Ticker = await marketStack.findQuote(tickerData.name);
  const currentTime = new Date().getTime();

  const createTickerData: Ticker = await tickers.create({
    //   name: findTicker.quoteResponse.result[0].symbol,
    name: tickerData.name,
    timestamp: new Date(currentTime).toISOString(),
    price: 8.12,
  });

  return createTickerData;
};

const updateTicker = async (tickerId: string, tickerData: CreateTickerDto): Promise<Ticker> => {
  if (isEmpty(tickerData)) throw new HttpException(400, 'The data is empty');

  if (tickerData.name) {
    const findTicker: Ticker = await tickers.findOne({ name: tickerData.name });
    if (findTicker && findTicker._id != tickerId) throw new HttpException(409, `The ticker ${tickerData.name} already exists`);
  }

  // const yahooData: Ticker = await marketStack.findQuote(tickerData.name);
  const currentTime = new Date().getTime();

  const updateTickerById: Ticker = await tickers.findByIdAndUpdate(tickerId, {
    name: tickerData.name,
    timestamp: new Date(currentTime).toISOString(),
    //   metadata: yahooData.quoteResponse.result[0],
    price: 7.8,
  });
  if (!updateTickerById) throw new HttpException(409, "You're not ticker");

  return updateTickerById;
};

const deleteTicker = async (tickerId: string): Promise<Ticker> => {
  const deleteTickerById: Ticker = await tickers.findByIdAndDelete(tickerId);
  if (!deleteTickerById) throw new HttpException(409, "You're not ticker");

  return deleteTickerById;
};

const getChart = async (req: PostTickerChart): Promise<GetTickerChart> => {
  return await finhub.findChart(req);
};

const autocomplete = async (req: unknown): Promise<unknown> => {
  return await marketStack.autocomplete(req);
};

export { findAllTicker, findTickerById, createTicker, updateTicker, deleteTicker, getChart, autocomplete };
