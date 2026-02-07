import quoteSummaryModel from '@/models/quoteSummaries.model';
import { GetQuoteSummary, PostQuoteSummary } from '@/features/quoteSummaries/quoteSummaries.interfaces';
import yahooRepository from '@/features/tickers/repositories/yahoo.repository';

class QuoteSummaryService {
  public quoteSummaries = quoteSummaryModel;
  public yahoo = new yahooRepository();

  public async getQuoteSummary(req: PostQuoteSummary): Promise<PostQuoteSummary> {
    return await this.yahoo.findQuoteSummary(req);
  }
}

export default QuoteSummaryService;
