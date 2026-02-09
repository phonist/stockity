import { PostInsight, GetInsight } from '@/features/insights/insights.interfaces';
import { GetTickerChart, PostTickerChart } from '@/features/tickers/tickers.interfaces';
import { HttpException } from '@/utils/HttpException';
import axios from 'axios';

class FinhubRepository {
  private getApiKey(): string {
    const apiKey = process.env.FINNHUB_API_KEY || process.env.FINHUB_API_KEY;
    if (!apiKey) {
      throw new HttpException(500, 'FINNHUB_API_KEY is not configured');
    }
    return apiKey;
  }

  private parseRangeToDays(range: string): number {
    const value = (range || '').toLowerCase();
    if (value.endsWith('d')) return Number(value.replace('d', '')) || 1;
    if (value.endsWith('w')) return (Number(value.replace('w', '')) || 1) * 7;
    if (value.endsWith('mo')) return (Number(value.replace('mo', '')) || 1) * 30;
    if (value.endsWith('y')) return (Number(value.replace('y', '')) || 1) * 365;
    return 30;
  }

  private mapResolution(interval: string): string {
    const value = (interval || '').toLowerCase();
    if (value.endsWith('m')) return String(Number(value.replace('m', '')) || 1);
    if (value.endsWith('h')) return String((Number(value.replace('h', '')) || 1) * 60);
    if (value === '1d' || value === 'd') return 'D';
    if (value === '1w' || value === 'w') return 'W';
    if (value === '1mo' || value === 'mo') return 'M';
    return 'D';
  }

  public async findChart(req: PostTickerChart): Promise<GetTickerChart> {
    const token = this.getApiKey();
    const to = Math.floor(Date.now() / 1000);
    const from = to - this.parseRangeToDays(req.range) * 24 * 60 * 60;

    return await axios
      .request({
        method: 'GET',
        url: 'https://finnhub.io/api/v1/stock/candle',
        params: {
          symbol: req.ticker,
          resolution: this.mapResolution(req.interval),
          from,
          to,
          token,
        },
      })
      .then(function (response) {
        const body = response.data || {};
        if (body.s !== 'ok') {
          throw new HttpException(404, 'No chart data found from Finnhub');
        }

        return {
          result: [
            {
              meta: { symbol: req.ticker },
              timestamp: body.t || [],
              indicators: {
                quote: [
                  {
                    open: body.o || [],
                    high: body.h || [],
                    low: body.l || [],
                    close: body.c || [],
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

  public async findInsight(req: PostInsight): Promise<GetInsight> {
    const token = this.getApiKey();
    const now = new Date();
    const fromDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const toIso = now.toISOString().slice(0, 10);
    const fromIso = fromDate.toISOString().slice(0, 10);

    return await axios
      .request({
        method: 'GET',
        url: 'https://finnhub.io/api/v1/company-news',
        params: {
          symbol: req.symbol,
          from: fromIso,
          to: toIso,
          token,
        },
      })
      .then(function (response) {
        const reports = Array.isArray(response.data)
          ? response.data.map((item: any) => ({
              id: item.id,
              title: item.headline,
              summary: item.summary,
              publishedOn: item.datetime ? new Date(item.datetime * 1000).toISOString() : undefined,
              source: item.source,
              url: item.url,
            }))
          : [];

        return {
          result: {
            symbol: req.symbol,
            instrumentInfo: {},
            reports,
            companySnapshot: {},
          },
          error: {},
        };
      })
      .catch(function (error) {
        throw new HttpException(500, error);
      });
  }
}

export default FinhubRepository;
