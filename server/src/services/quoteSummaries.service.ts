import quoteSummaryModel from '@/models/quoteSummaries.model';
import { GetQuoteSummary, PostQuoteSummary } from '@interfaces/quoteSummaries.interface';
import yahooRepository from '@repositories/yahoo.repository';

class QuoteSummaryService {
  public quoteSummaries = quoteSummaryModel;
  public yahoo = new yahooRepository();

  public async getQuoteSummary(req: PostQuoteSummary): Promise<PostQuoteSummary> {
    return await this.yahoo.findQuoteSummary(req);
  }
}

export default QuoteSummaryService;
