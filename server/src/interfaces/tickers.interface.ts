export interface Ticker {
  name: string;
  timestamp: Date;
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
  meta: any;
  timestamp: any;
  indicators: any;
}
