export interface Insight {
    result: {
        symbol: string;
        instrumentInfo: object;
        reports: Array<object>;
        companySnapshot: object;
    };
    error: object;
}

export interface PostInsight {
    symbol: string;
}