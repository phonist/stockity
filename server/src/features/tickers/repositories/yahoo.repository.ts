import { HttpException } from '@/utils/HttpException';
import { PostInsight } from '@/features/insights/insights.interfaces';
import { PostTickerQuote } from '@/features/quotes/quotes.interfaces';
import { PostQuoteSummary } from '@/features/quoteSummaries/quoteSummaries.interfaces';
import { GetTickerChart, PostTickerChart } from '@/features/tickers/tickers.interfaces';
import axios from 'axios';

class YahooRepository {
  // Real time quote data for stocks, ETFs, mutual funds, etc.
  public async findQuote(req: PostTickerQuote): Promise<any> {
    return await axios
      .request({
        method: 'GET',
        url: 'https://query1.finance.yahoo.com/v7/finance/quote',
        params: {
          symbols: req.symbols,
          region: req.region,
          lang: req.lang,
        },
      })
      .then(function (response) {
        return response.data.quoteResponse;
      })
      .catch(function (error) {
        throw new HttpException(500, error);
      });
  }

  // Get chart data by ticker
  public async findChart(req: PostTickerChart): Promise<GetTickerChart> {
    return await axios
      .request({
        method: 'GET',
        url: `https://query1.finance.yahoo.com/v8/finance/chart/${req.ticker}`,
        params: {
          range: req.range,
          region: req.region,
          interval: req.interval,
          lang: req.lang,
          events: req.events,
        },
      })
      .then(function (response) {
        return response.data.chart;
      })
      .catch(function (error) {
        throw new HttpException(500, error);
      });
  }

  // Get detailed information for a particular stock.
  public async findQuoteSummary(req: PostQuoteSummary): Promise<any> {
    const modules = Array.isArray(req.modules) ? req.modules.join(',') : req.modules;

    return await axios
      .request({
        method: 'GET',
        url: `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${req.symbol}`,
        params: {
          lang: req.lang,
          region: req.region,
          modules,
        },
      })
      .then(function (response) {
        return response.data.quoteSummary;
      })
      .catch(function (error) {
        throw new HttpException(500, error);
      });
  }

  // Research insights
  public async findInsight(req: PostInsight): Promise<any> {
    return await axios
      .request({
        method: 'GET',
        url: 'https://query1.finance.yahoo.com/ws/insights/v1/finance/insights',
        params: {
          symbol: req.symbol,
        },
      })
      .then(function (response) {
        return response.data.finance;
      })
      .catch(function (error) {
        throw new HttpException(500, error);
      });
  }

  // Get auto complete stocks suggestions
  public async autocomplete(req: any): Promise<any> {
    return await axios
      .request({
        method: 'GET',
        url: 'https://query2.finance.yahoo.com/v1/finance/search',
        params: {
          q: req.query,
          quotesCount: 10,
          newsCount: 0,
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw new HttpException(500, error);
      });
  }

  // Get option chain for a particular symbol
  public async findOptions(req: any): Promise<any> {
    return await axios
      .request({
        method: 'GET',
        url: `https://query2.finance.yahoo.com/v7/finance/options/${req.symbol}`,
        params: {
          date: req.date,
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw new HttpException(500, error);
      });
  }

  // Stock history spark data
  public async findSparks(req: any): Promise<any> {
    return await axios
      .request({
        method: 'GET',
        url: 'https://query1.finance.yahoo.com/v7/finance/spark',
        params: {
          range: req.range,
          interval: req.interval,
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

  // List similar stocks
  public async findRecommendationsbySymbol(req: any): Promise<any> {
    return await axios
      .request({
        method: 'GET',
        url: `https://query2.finance.yahoo.com/v6/finance/recommendationsbysymbol/${req.symbol}`,
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw new HttpException(500, error);
      });
  }

  // Most added to watchlist
  public async findScreener(req: any): Promise<any> {
    return await axios
      .request({
        method: 'GET',
        url: 'https://query1.finance.yahoo.com/v1/finance/screener/predefined/saved',
        params: {
          count: req.count,
          scrIds: req.scrIds,
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw new HttpException(500, error);
      });
  }

  // Get live market summary information at the request time
  public async findMarketSummary(req: any): Promise<any> {
    return await axios
      .request({
        method: 'GET',
        url: 'https://query1.finance.yahoo.com/v1/finance/trending/marketSummary',
        params: {
          region: req.region,
          lang: req.lang,
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw new HttpException(500, error);
      });
  }

  // Trending stocks
  public async findTrending(req: any): Promise<any> {
    return await axios
      .request({
        method: 'GET',
        url: `https://query1.finance.yahoo.com/v1/finance/trending/${req.region}`,
        params: {
          region: req.region,
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
