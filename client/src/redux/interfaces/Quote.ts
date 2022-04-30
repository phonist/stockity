export interface Quote {
    result: Array<QuoteState>
    error: object;
}

interface QuoteState {
    symbol: string;
    regularMarketPrice: number;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    postMarketPrice: number;
    postMarketChange: number;
    postMarketChangePercent: number;
}