import quoteSummaryModel from '@/models/quoteSummaries.model';
import { GetQuoteSummary, PostQuoteSummary } from '@/features/quoteSummaries/quoteSummaries.interfaces';
import marketStackRepository from '../tickers/repositories/marketStack.repository';

const quoteSummaries = quoteSummaryModel;
const marketStack = new marketStackRepository();

const getQuoteSummary = async (req: PostQuoteSummary): Promise<PostQuoteSummary> => {
  return await marketStack.findQuoteSummary(req);
};

export { getQuoteSummary };
