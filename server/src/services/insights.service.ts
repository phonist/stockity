import insightModel from '@/models/insights.model';
import { GetInsight, PostInsight } from '@interfaces/insights.interface';
import yahooRepository from '@repositories/yahoo.repository';

class InsightService {
  public insights = insightModel;
  public yahoo = new yahooRepository();

  public async getInsight(req: PostInsight): Promise<PostInsight> {
    // const getInsight: GetInsight = await this.yahoo.findInsight(req);
    // const model = {
    //   timestamp: new Date().getTime(),
    //   name: getInsight.finance.result.symbol,
    //   meta: getInsight.finance.result,
    // };
    // const insights: GetInsight = await this.insights.create(model);
    // return insights;
    return await this.yahoo.findInsight(req);
  }
}

export default InsightService;
