export interface QuoteSummary {
    data: QuoteSummaryData;
    message: string;
    error?: object;
}

interface QuoteSummaryData {
    pagination: Pagination;
    data: Array<QuoteSummaryState>;
}

interface Pagination {
    limit: number;
    offset: number;
    count: number;
    total: number;
}

interface QuoteSummaryState {
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    adj_high: number;
    adj_low: number;
    adj_close: number;
    adj_open: number;
    adj_volume: number;
    split_factor: number;
    dividend: number;
    symbol: string;
    exchange: string;
    date: string;
}

export interface PostQuoteSummary {
    lang: string;
    region: string;
    modules: string;
    symbol: string;
}
