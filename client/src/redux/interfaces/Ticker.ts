export interface Ticker {
    result: TickerChart
    error: object;
}

// export interface TickerChart {
//     indicators: any;
//     meta: any;
//     timestamp: Array<Number>;
// }
interface TickerChart {
    meta: {
        symbol: string;
    };
    indicators: {
        quote: Array<IntraDayChart>
    };
    timestamp: Array<Number>;
}

interface IntraDayChart {
    open: Array<number>;
    high: Array<number>;
    low: Array<number>;
    close: Array<number>;
}