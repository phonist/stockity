import { HttpException } from '@/utils/HttpException';
import { PostInsight } from '@/features/insights/insights.interfaces';
import { PostTickerQuote } from '@/features/quotes/quotes.interfaces';
import { PostQuoteSummary } from '@/features/quoteSummaries/quoteSummaries.interfaces';
import { GetTickerChart, PostTickerChart } from '@/features/tickers/tickers.interfaces';
import axios from 'axios';

class MarketStackRepository {
  private getMarketStackApiKey(): string {
    const apiKey = process.env.MARKET_STACK_API_KEY;
    if (!apiKey) {
      throw new HttpException(500, 'MARKET_STACK_API_KEY is not configured');
    }
    return apiKey;
  }

  public async findQuote(req: PostTickerQuote): Promise<any> {
    const accessKey = this.getMarketStackApiKey();
    return await axios
      .request({
        method: 'GET',
        url: 'http://api.marketstack.com/v1/eod/latest',
        params: {
          access_key: accessKey,
          symbols: req.symbols,
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw new HttpException(500, error);
      });
  }

  public async findChart(req: PostTickerChart): Promise<GetTickerChart> {
    const accessKey = this.getMarketStackApiKey();
    return await axios
      .request({
        method: 'GET',
        url: `http://api.marketstack.com/v2/intraday`,
        params: {
          access_key: accessKey,
          symbols: req.ticker,
          exchange: req.region,
          limit: req.range,
          offset: req.interval,
        },
      })
      .then(function (response) {
        const points = Array.isArray(response.data?.data) ? response.data.data : [];

        const open: number[] = [];
        const high: number[] = [];
        const low: number[] = [];
        const close: number[] = [];
        const timestamp: number[] = [];

        points.forEach((point: any) => {
          const ts = Math.floor(new Date(point.date).getTime() / 1000);
          if (!Number.isFinite(ts)) return;
          if ([point.open, point.high, point.low, point.close].some((value: any) => value === null || value === undefined)) return;

          timestamp.push(ts);
          open.push(Number(point.open));
          high.push(Number(point.high));
          low.push(Number(point.low));
          close.push(Number(point.close));
        });

        return {
          result: [
            {
              meta: {
                symbol: req.ticker,
              },
              timestamp,
              indicators: {
                quote: [
                  {
                    open,
                    high,
                    low,
                    close,
                  },
                ],
              },
            },
          ],
          error: {},
        };
      })
      .catch(function (error) {
        throw new HttpException(500, error);
      });
  }

  public async findQuoteSummary(req: PostQuoteSummary): Promise<any> {
    const accessKey = this.getMarketStackApiKey();
    return await axios
      .request({
        method: 'GET',
        url: `http://api.marketstack.com/v1/eod/latest`,
        params: {
          access_key: accessKey,
          symbols: req.symbol,
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw new HttpException(500, error);
      });
  }

  public async findInsight(req: PostInsight): Promise<any> {
    void req;
    throw new HttpException(501, 'MarketStack insights endpoint is not implemented');
  }

  public async autocomplete(req: any): Promise<any> {
    const accessKey = this.getMarketStackApiKey();
    return await axios
      .request({
        method: 'GET',
        url: `http://api.marketstack.com/v1/tickers`,
        params: {
          access_key: accessKey,
          search: req.query,
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw new HttpException(500, error);
      });
  }
}

export default MarketStackRepository;
