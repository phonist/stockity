export interface Insight {
    result: InsightResult;
    error: object;
}

export interface InsightResult {
    symbol: string;
    instrumentInfo: object;
    reports: Array<InsightReport>;
    companySnapshot: object;
}

export interface InsightReport {
    id?: number | string;
    title?: string;
    summary?: string;
    publishedOn?: string;
    source?: string;
    url?: string;
}

export interface PostInsight {
    symbol: string;
}
