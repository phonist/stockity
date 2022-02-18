export interface Ticker {
    _id: string;
    name: string;
    price: number;
    datetime: Date;
    meta: any;
    indicators: any;
    timestamp: Array<Number>;
}

export interface TickerChart {
    indicators: any;
    meta: any;
    timestamp: Array<Number>;
}