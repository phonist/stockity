import {
    GET_QUOTESUMMARIES,
    GetQuoteSummariesStateType,
    QuoteSummaryActionTypes,
    QuoteSummaryErrorActionTypes,
    ERROR_QUOTESUMMARIES,
} from '../types/QuoteSummaryTypes';

const initialStateGetQuoteSummaries: GetQuoteSummariesStateType = {
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
    action: QuoteSummaryActionTypes | QuoteSummaryErrorActionTypes,
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