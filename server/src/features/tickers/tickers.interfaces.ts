export interface Ticker {
  _id?: string;
  name: string;
  timestamp: string | Date;
  price: number;
}

export interface PostTickerChart {
  range: string;
  region: string;
  interval: string;
  lang: string;
  ticker: string;
  events: string;
}

export interface GetTickerChart {
  result: {
    meta: any;
    timestamp: any;
    indicators: any;
  };
  error: object;
}
