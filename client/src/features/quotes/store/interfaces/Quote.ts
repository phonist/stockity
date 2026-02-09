export interface Quote {
    data: Array<QuoteState>
    pagination: Pagination;
    error: object;
}

interface QuoteState {
    adj_close: number;
    adj_high: number;
    adj_low: number;
    adj_open: number;
    adj_volume: number;
    close: number;
    date: string;
    dividend: number;
    exchange: string;
    high: number;
    low: number;
    open: number;
    split_factor: number;
    symbol: string;
    volume: number;
}

interface Pagination {
    limit: number;
    offset: number;
    count: number;
    total: number;
}

export interface PostQuote {
    region: string;
    lang: string;
    symbols: string;
}
