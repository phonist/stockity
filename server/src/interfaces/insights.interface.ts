export interface Insight {
  timestamp: number;
  name: string;
  meta: any;
}

export interface PostInsight {
  symbol: string;
}

export interface GetInsight {
  result: any;
}
