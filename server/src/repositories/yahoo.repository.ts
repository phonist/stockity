import { HttpException } from '@/exceptions/HttpException';
import { PostInsight } from '@/interfaces/insights.interface';
import { PostTickerQuote } from '@/interfaces/quotes.interface';
import { PostQuoteSummary } from '@/interfaces/quoteSummaries.interface';
import { PostTickerChart } from '@/interfaces/tickers.interface';
import axios from 'axios';

class YahooRepository {
  //Real time quote data for stocks, ETFs, mutuals funds, etc…
  public async findQuote(req: PostTickerQuote): Promise<any> {
    return await axios
      .request({
        method: 'GET',
        url: `https://yfapi.net/v6/finance/quote`,
        headers: {
          'x-api-key': process.env.YAHOO_API_KEY,
        },
        params: {
          modules: 'defaultKeyStatistics,assetProfile',
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

  //Get very detailed information for a particular stock.
  public async findQuoteSummary(req: PostQuoteSummary): Promise<any> {
    return await axios
      .request({
        method: 'GET',
        url: `https://yfapi.net/v11/finance/quoteSummary/${req.symbol}`,
        headers: {
          'x-api-key': process.env.YAHOO_API_KEY,
        },
        params: {
          lang: req.lang,
          region: req.region,
          modules: req.modules,
          symbol: req.symbol,
        },
      })
      .then(function (response) {
        return response.data.quoteSummary;
      })
      .catch(function (error) {
        throw new HttpException(500, error);
      });
  }

  //Research insights
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

  //Get auto complete stocks suggestions
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

  //get option chain for a particular symbol
  public async findOptions(req: any): Promise<any> {
    return await axios
      .request({
        method: 'GET',
        url: `https://yfapi.net/v6/finance/options/${req.symbol}`,
        headers: {
          'x-api-key': process.env.YAHOO_API_KEY,
        },
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

  //stock history
  public async findSparks(req: any): Promise<any> {
    return await axios
      .request({
        method: 'GET',
        url: `https://yfapi.net/v8/finance/sparks`,
        headers: {
          'x-api-key': process.env.YAHOO_API_KEY,
        },
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

  //List similar stocks
  public async findRecommendationsbySymbol(req: any): Promise<any> {
    return await axios
      .request({
        method: 'GET',
        url: `https://yfapi.net/v6/finance/recommendations/${req.symbol}`,
        headers: {
          'x-api-key': process.env.YAHOO_API_KEY,
        },
        params: {
          symbol: req.symbol,
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw new HttpException(500, error);
      });
  }

  //most added to watchlist
  public async findScreener(req: any): Promise<any> {
    return await axios
      .request({
        method: 'GET',
        url: `https://yfapi.net/v1/finance/screener/predefined/saved`,
        headers: {
          'x-api-key': process.env.YAHOO_API_KEY,
        },
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

  //Get live market summary information at the request time
  public async findMarketSummary(req: any): Promise<any> {
    return await axios
      .request({
        method: 'GET',
        url: `https://yfapi.net/v1/finance/trending/marketSummary`,
        headers: {
          'x-api-key': process.env.YAHOO_API_KEY,
        },
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

  //Trending stocks
  public async findTrending(req: any): Promise<any> {
    return await axios
      .request({
        method: 'GET',
        url: `https://yfapi.net/v1/finance/trending/${req.region}`,
        headers: {
          'x-api-key': process.env.YAHOO_API_KEY,
        },
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
