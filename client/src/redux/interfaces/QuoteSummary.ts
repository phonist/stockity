export interface QuoteSummary {
    result: Array<QuoteSummaryState>;
    error: object;
}

interface QuoteSummaryState {
    assetProfile: object;
    recommendationTrend: object;
    cashflowStatementHistory: object;
    indexTrend: object;
    defaultKeyStatistics: {
        enterpriseValue: {
            fmt: string;
        }, 
        forwardPE: {
            fmt: string;
        },        
        pegRatio: {
            fmt: string;
        },
        priceToBook: {
            fmt: string;
        },
        enterpriseToRevenue: {
            fmt: string;
        },
        enterpriseToEbitda: {
            fmt: string;
        },
        lastFiscalYearEnd: {
            fmt: string;
        },
        mostRecentQuarter: {
            fmt: string;
        },
    };
    quoteType: object;
    incomeStatementHistory: object;
    fundOwnership: object;
    summaryDetail: {
        marketCap: {
            fmt: string;
        },
        trailingPE: {
            fmt: string;
        },
        priceToSalesTrailing12Months: {
            fmt: string;
        },
    };
    insiderHolders: object;
    calendarEvents: object;
    upgradeDowngradeHistory: object;
    balanceSheetHistory: object;
    earningsTrend: object;
    secFilings: object;
    institutionOwnership: object;
    majorHoldersBreakdown: object;
    balanceSheetHistoryQuarterly: object;
    earningsHistory: object;
    majorDirectHolders: object;
    esgScores: object;
    netSharePurchaseActivity: object;
    insiderTransactions: object;
    sectorTrend: object;
    incomeStatementHistoryQuarterly: object;
    cashflowStatementHistoryQuarterly: object;
    earnings: object;
    financialData: object;
}

export interface PostQuoteSummary {
    lang: string;
    region: string;
    modules: string;
    symbol: string;
}