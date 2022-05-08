
import { Dispatch } from "redux";
import { getAutocomplete } from '../../api/autocomplete';
import { getAutocompleteAction, errorAutocompleteAction, selectAutocompleteAction } from '../actions/AutocompleteActions';
import { AutocompleteActionTypes, AutocompleteErrorActionTypes, AutocompleteSelectActionTypes } from '../types/AutocompleteTypes';
import { TickerPostActionTypes } from '../types/TickerTypes';
import { updatePostTicker } from '../actions/TickerActions';
import { updateQuoteTicker } from '../actions/QuoteActions';
import { QuotePostActionTypes } from "../types/QuoteTypes";
import { updateQuoteSummary } from "../actions/QuoteSummaryActions";
import { QuoteSummaryPostActionTypes } from "../types/QuoteSummaryTypes";
import { updateInsights } from "../actions/InsightActions";
import { InsightPostActionTypes } from "../types/InsightTypes";

export const attemptGetAutocomplete = (params:any) => async (dispatch: Dispatch<AutocompleteActionTypes | AutocompleteErrorActionTypes>) => {
    let postQuery = {
        query: params
    };
    const tickers = await getAutocomplete(postQuery)
        .then(response => {
            dispatch(getAutocompleteAction(response.data));
        })
        .catch(error => {
            dispatch(errorAutocompleteAction(error));
        });
}

export const attemptSelectAutocomplete = (params: any) => async (dispatch: Dispatch<AutocompleteSelectActionTypes|TickerPostActionTypes|QuotePostActionTypes|QuoteSummaryPostActionTypes|InsightPostActionTypes>) => {
    let postTicker = {
        range: "1mo",
        region: "US",
        interval: "1d",
        lang: "en",
        ticker: params.ResultSet.Query,
        events: "div"
    }
    dispatch(updatePostTicker(postTicker));
    let postQuote = {
        region: 'US',
        lang: 'en',
        symbols: params.ResultSet.Query,
    }
    dispatch(updateQuoteTicker(postQuote));
    let postQuoteSummary = {
        lang: 'en',
        region: 'US',
        modules: 'summaryDetail,assetProfile,fundProfile,financialData,defaultKeyStatistics,calendarEvents,incomeStatementHistory,incomeStatementHistoryQuarterly,cashflowStatementHistory,balanceSheetHistory,earnings,earningsHistory,insiderHolders,cashflowStatementHistory,cashflowStatementHistoryQuarterly,insiderTransactions,secFilings,indexTrend,sectorTrend,earningsTrend,netSharePurchaseActivity,upgradeDowngradeHistory,institutionOwnership,recommendationTrend,balanceSheetHistory,balanceSheetHistoryQuarterly,fundOwnership,majorDirectHolders,majorHoldersBreakdown,price,quoteType,esgScores',
        symbol: params.ResultSet.Query,
    }
    dispatch(updateQuoteSummary(postQuoteSummary));
    let postInsights = {
        symbol: params.ResultSet.Query,
    }
    dispatch(updateInsights(postInsights));
}