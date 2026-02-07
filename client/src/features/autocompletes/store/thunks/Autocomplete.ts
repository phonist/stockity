
import { Dispatch } from "redux";
import { getAutocomplete } from '../../api/autocomplete';
import { setAutocompletes, setAutocompleteError, selectAutocomplete } from '../autocompletesSlice';
import { setPostTicker } from '../../../tickers/store/tickersSlice';
import { setPostQuote } from '../../../quotes/store/quotesSlice';
import { setPostQuoteSummaries } from "../../../quoteSummaries/store/quoteSummariesSlice";
import { setPostInsights } from "../../../insights/store/insightsSlice";

export const attemptGetAutocomplete = (params:any) => async (dispatch: Dispatch) => {
    let postQuery = {
        query: params
    };
    const tickers = await getAutocomplete(postQuery)
        .then(response => {
            dispatch(setAutocompletes(response.data));
        })
        .catch(error => {
            dispatch(setAutocompleteError(error));
        });
}

export const attemptSelectAutocomplete = (params: any) => async (dispatch: Dispatch) => {
    let postTicker = {
        range: "1mo",
        region: "US",
        interval: "1d",
        lang: "en",
        ticker: params.ResultSet.Query,
        events: "div"
    }
    dispatch(setPostTicker(postTicker));
    let postQuote = {
        region: 'US',
        lang: 'en',
        symbols: params.ResultSet.Query,
    }
    dispatch(setPostQuote(postQuote));
    let postQuoteSummary = {
        lang: 'en',
        region: 'US',
        modules: 'summaryDetail,assetProfile,fundProfile,financialData,defaultKeyStatistics,calendarEvents,incomeStatementHistory,incomeStatementHistoryQuarterly,cashflowStatementHistory,balanceSheetHistory,earnings,earningsHistory,insiderHolders,cashflowStatementHistory,cashflowStatementHistoryQuarterly,insiderTransactions,secFilings,indexTrend,sectorTrend,earningsTrend,netSharePurchaseActivity,upgradeDowngradeHistory,institutionOwnership,recommendationTrend,balanceSheetHistory,balanceSheetHistoryQuarterly,fundOwnership,majorDirectHolders,majorHoldersBreakdown,price,quoteType,esgScores',
        symbol: params.ResultSet.Query,
    }
    dispatch(setPostQuoteSummaries(postQuoteSummary));
    let postInsights = {
        symbol: params.ResultSet.Query,
    }
    dispatch(setPostInsights(postInsights));
    dispatch(selectAutocomplete(params));
}
