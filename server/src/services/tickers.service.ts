import { CreateTickerDto } from '@dtos/tickers.dto';
import { HttpException } from '@exceptions/HttpException';
import { GetTickerChart, PostTickerChart, Ticker } from '@interfaces/tickers.interface';
import tickerModel from '@models/tickers.model';
import { isEmpty } from '@utils/util';
import yahooRepository from '@repositories/yahoo.repository';

class TickerService {
  public tickers = tickerModel;
  public yahoo = new yahooRepository();

  public async findAllTicker(): Promise<Ticker[]> {
    const tickers: Ticker[] = await this.tickers.find();
    return tickers;
  }

  public async findTickerById(tickerId: string): Promise<Ticker> {
    if (isEmpty(tickerId)) throw new HttpException(400, 'There are no ticker symbol provided');
    const findTicker: Ticker = await this.tickers.findOne({ _id: tickerId });
    // const findTicker: Ticker = await this.yahoo.findQuote(tickerId);

    if (!findTicker) throw new HttpException(409, 'Ticker not available');

    return findTicker;
  }

  public async createTicker(tickerData: CreateTickerDto): Promise<Ticker> {
    if (isEmpty(tickerData)) throw new HttpException(400, "You're not tickerData");

    const checkTicker: Ticker = await this.tickers.findOne({ name: tickerData.name });

    if (checkTicker) throw new HttpException(409, `The ticker ${tickerData.name} already exists`);

    // const findTicker: Ticker = await this.yahoo.findQuote(tickerData.name);
    const currentTime = new Date().getTime();

    const createTickerData: Ticker = await this.tickers.create({
      //   name: findTicker.quoteResponse.result[0].symbol,
      name: tickerData.name,
      timestamp: new Date(currentTime).toISOString(),
      price: 8.12,
    });

    return createTickerData;
  }

  public async updateTicker(tickerId: string, tickerData: CreateTickerDto): Promise<Ticker> {
    if (isEmpty(tickerData)) throw new HttpException(400, 'The data is empty');

    if (tickerData.name) {
      const findTicker: Ticker = await this.tickers.findOne({ name: tickerData.name });
      if (findTicker && findTicker._id != tickerId) throw new HttpException(409, `The ticker ${tickerData.name} already exists`);
    }

    // const yahooData: Ticker = await this.yahoo.findQuote(tickerData.name);
    const currentTime = new Date().getTime();

    const updateTickerById: Ticker = await this.tickers.findByIdAndUpdate(tickerId, {
      name: tickerData.name,
      timestamp: new Date(currentTime).toISOString(),
      //   metadata: yahooData.quoteResponse.result[0],
      price: 7.8,
    });
    if (!updateTickerById) throw new HttpException(409, "You're not ticker");

    return updateTickerById;
  }

  public async deleteTicker(tickerId: string): Promise<Ticker> {
    const deleteTickerById: Ticker = await this.tickers.findByIdAndDelete(tickerId);
    if (!deleteTickerById) throw new HttpException(409, "You're not ticker");

    return deleteTickerById;
  }

  public async getChart(req: PostTickerChart): Promise<PostTickerChart> {
    const getTickerChart: GetTickerChart = await this.yahoo.findChart(req);
    const tickers: GetTickerChart = await this.tickers.create(getTickerChart);
    return tickers;
  }

  public async autocomplete(req: string): Promise<string> {
    const autocomplete: string = await this.yahoo.autocomplete(req);
    return autocomplete;
  }
}

export default TickerService;
