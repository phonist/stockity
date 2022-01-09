import { combineReducers } from "@reduxjs/toolkit";
import { getTickersReducer } from "./TickerReducer";
import { getQuotesReducer } from "./QuoteReducer";
import { getQuoteSummariesReducer } from "./QuoteSummaryReducer";
import { getInsightsReducer } from "./InsightReducer";

const rootReducer = combineReducers({
    tickers: getTickersReducer,
    quotes: getQuotesReducer,
    quoteSummaries: getQuoteSummariesReducer,
    insights: getInsightsReducer,
});

export default rootReducer;