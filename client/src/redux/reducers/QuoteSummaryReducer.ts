import {
    GET_QUOTESUMMARIES,
    GetQuoteSummariesStateType,
    QuoteSummaryActionTypes,
    QuoteSummaryErrorActionTypes,
    QuoteSummaryPostActionTypes,
    ERROR_QUOTESUMMARIES,
    POST_QUOTESUMMARIES,
} from '../types/QuoteSummaryTypes';

const initialStateGetQuoteSummaries: GetQuoteSummariesStateType = {
    postQuoteSummaries: {
        region: 'US',
        lang: 'en',
        modules: 'summaryDetail,assetProfile,fundProfile,financialData,defaultKeyStatistics,calendarEvents,incomeStatementHistory,incomeStatementHistoryQuarterly,cashflowStatementHistory,balanceSheetHistory,earnings,earningsHistory,insiderHolders,cashflowStatementHistory,cashflowStatementHistoryQuarterly,insiderTransactions,secFilings,indexTrend,sectorTrend,earningsTrend,netSharePurchaseActivity,upgradeDowngradeHistory,institutionOwnership,recommendationTrend,balanceSheetHistory,balanceSheetHistoryQuarterly,fundOwnership,majorDirectHolders,majorHoldersBreakdown,price,quoteType,esgScores',
        symbol: 'AAPL',
    },
    quoteSummaries: {
        result: [
            {
                assetProfile: {},
                recommendationTrend: {},
                cashflowStatementHistory: {},
                indexTrend: {},
                defaultKeyStatistics: {
                    enterpriseValue: {
                        fmt: '',
                    }, 
                    forwardPE: {
                        fmt: '',
                    },        
                    pegRatio: {
                        fmt: '',
                    },
                    priceToBook: {
                        fmt: '',
                    },
                    enterpriseToRevenue: {
                        fmt: '',
                    },
                    enterpriseToEbitda: {
                        fmt: '',
                    },
                    lastFiscalYearEnd: {
                        fmt: '',
                    },
                    mostRecentQuarter: {
                        fmt: '',
                    },
                },
                quoteType: {},
                incomeStatementHistory: {},
                fundOwnership: {},
                summaryDetail: {
                    marketCap: {
                        fmt: '',
                    },
                    trailingPE: {
                        fmt: '',
                    },
                    priceToSalesTrailing12Months: {
                        fmt: '',
                    },
                },
                insiderHolders: {},
                calendarEvents: {},
                upgradeDowngradeHistory: {},
                balanceSheetHistory: {},
                earningsTrend: {},
                secFilings: {},
                institutionOwnership: {},
                majorHoldersBreakdown: {},
                balanceSheetHistoryQuarterly: {},
                earningsHistory: {},
                majorDirectHolders: {},
                esgScores: {},
                netSharePurchaseActivity: {},
                insiderTransactions: {},
                sectorTrend: {},
                incomeStatementHistoryQuarterly: {},
                cashflowStatementHistoryQuarterly: {},
                earnings: {},
                financialData: {}
            },
        ],
        error: {},
    },
    loading: true,
    error: {},
    empty: true,
};

export const getQuoteSummariesReducer = (
    state = initialStateGetQuoteSummaries,
    action: QuoteSummaryActionTypes | QuoteSummaryErrorActionTypes | QuoteSummaryPostActionTypes,
): GetQuoteSummariesStateType => {
    switch (action.type) {
        case GET_QUOTESUMMARIES:
            return {
                ...state,
                quoteSummaries: action.payload,
                loading: false,
                error: action.payload.error,
                empty: false,
            };

        case POST_QUOTESUMMARIES:
            return {
                ...state,
                postQuoteSummaries: action.payload,
                loading: true,
                error: true,
                empty: true,
            };
        case ERROR_QUOTESUMMARIES:
            return {
                ...state,
                quoteSummaries: {
                    result: initialStateGetQuoteSummaries.quoteSummaries.result,
                    error: action.payload,
                },
                loading: false,
                error: true,
                empty: true,
            };
        default:
            return state;
    }
}