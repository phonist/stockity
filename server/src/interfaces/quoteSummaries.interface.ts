export interface PostQuoteSummary {
  lang: string;
  region: string;
  modules: string;
  symbol: string;
}

export interface GetQuoteSummary {
  result: object;
  error: null;
}
