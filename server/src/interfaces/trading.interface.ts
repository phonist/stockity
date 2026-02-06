export type TradeSide = 'buy' | 'sell';

export interface Trade {
  _id?: string;
  symbol: string;
  side: TradeSide;
  quantity: number;
  price: number;
  total: number;
  executedAt: Date;
}

export interface Account {
  _id?: string;
  name: string;
  cash: number;
  currency: string;
  updatedAt: Date;
}

export interface Position {
  symbol: string;
  quantity: number;
  averageCost: number;
  lastPrice: number;
  marketValue: number;
}

export interface PortfolioSummary {
  cash: number;
  currency: string;
  positions: Position[];
  totalMarketValue: number;
  totalEquity: number;
}
