import quoteSummaryModel from '@/models/quoteSummaries.model';
import { GetQuoteSummary, PostQuoteSummary } from '@/features/quoteSummaries/quoteSummaries.interfaces';
import yahooRepository from '@/features/tickers/repositories/yahoo.repository';

const quoteSummaries = quoteSummaryModel;
const yahoo = new yahooRepository();

const getQuoteSummary = async (req: PostQuoteSummary): Promise<PostQuoteSummary> => {
  return await yahoo.findQuoteSummary(req);
};

export { getQuoteSummary };
