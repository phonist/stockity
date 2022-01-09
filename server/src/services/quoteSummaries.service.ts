import quoteSummaryModel from '@/models/quoteSummaries.model';
import { GetQuoteSummary, PostQuoteSummary } from '@interfaces/quoteSummaries.interface';
import yahooRepository from '@repositories/yahoo.repository';

class QuoteSummaryService {
  public quoteSummaries = quoteSummaryModel;
  public yahoo = new yahooRepository();

  public async getQuoteSummary(req: PostQuoteSummary): Promise<PostQuoteSummary> {
    const getQuoteSummary: GetQuoteSummary = await this.yahoo.findQuoteSummary(req);
    const model = {
      timestamp: getQuoteSummary.defaultKeyStatistics.mostRecentQuarter.raw,
      name: req.symbol,
      meta: getQuoteSummary,
    };
    const quoteSummaries: GetQuoteSummary = await this.quoteSummaries.create(model);
    return quoteSummaries;
  }
}

export default QuoteSummaryService;
