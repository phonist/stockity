export interface Quote {
  name: string;
  timestamp: Date;
  meta: Object;
}

export interface PostTickerQuote {
  region: string;
  lang: string;
  symbols: string;
}

export interface GetTickerQuote {
  timestamp: Number;
  name: string;
  meta: Object;
}
