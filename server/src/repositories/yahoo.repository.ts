import { HttpException } from '@/exceptions/HttpException';
import { PostInsight } from '@/interfaces/insights.interface';
import { PostTickerQuote } from '@/interfaces/quotes.interface';
import { PostQuoteSummary } from '@/interfaces/quoteSummaries.interface';
import { PostTickerChart } from '@/interfaces/tickers.interface';
import axios from 'axios';

class YahooRepository {
  public async findQuote(req: PostTickerQuote): Promise<any> {
    return await axios
      .request({
        method: 'GET',
        url: 'https://yfapi.net/v6/finance/quote',
        params: {
          modules: 'defaultKeyStatistics,assetProfile',
          symbols: req.symbols,
          region: req.region,
          lang: req.lang,
        },
        headers: {
          'x-api-key': process.env.YAHOO_API_KEY,
        },
      })
      .then(function (response) {
        return response.data.quoteResponse;
      })
      .catch(function (error) {
        throw new HttpException(500, error);
      });
  }

  public async findChart(req: PostTickerChart): Promise<PostTickerChart> {
    return await axios
      .request({
        method: 'GET',
        url: `https://yfapi.net/v8/finance/chart/${req.ticker}`,
        params: {
          range: req.range,
          region: req.region,
          interval: req.interval,
          lang: req.lang,
          ticker: req.ticker,
          events: req.events,
        },
        headers: {
          'x-api-key': process.env.YAHOO_API_KEY,
        },
      })
      .then(function (response) {
        return response.data.chart.result[0];
      })
      .catch(function (error) {
        throw new HttpException(500, error);
      });
  }

  public async findQuoteSummary(req: PostQuoteSummary): Promise<any> {
    return await axios
      .request({
        method: 'GET',
        url: `https://yfapi.net/v11/finance/quoteSummary/${req.symbol}`,
        params: {
          lang: req.lang,
          region: req.region,
          modules: req.modules,
          symbol: req.symbol,
        },
        headers: {
          'x-api-key': process.env.YAHOO_API_KEY,
        },
      })
      .then(function (response) {
        return response.data.quoteSummary.result[0];
      })
      .catch(function (error) {
        throw new HttpException(500, error);
      });
  }

  public async findInsight(req: PostInsight): Promise<any> {
    return await axios
      .request({
        method: 'GET',
        url: `https://yfapi.net/ws/insights/v1/finance/insights`,
        params: {
          symbol: req.symbol,
        },
        headers: {
          'x-api-key': process.env.YAHOO_API_KEY,
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw new HttpException(500, error);
      });
  }

  public async autocomplete(req: any): Promise<any> {
    return await axios
      .request({
        method: 'GET',
        url: `https://yfapi.net/v6/finance/autocomplete`,
        params: {
          region: req.region,
          lang: req.lang,
          query: req.query,
        },
        headers: {
          'x-api-key': process.env.YAHOO_API_KEY,
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

export default YahooRepository;
