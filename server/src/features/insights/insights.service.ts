import insightModel from '@/models/insights.model';
import { GetInsight, PostInsight } from '@/features/insights/insights.interfaces';
import yahooRepository from '@/features/tickers/repositories/yahoo.repository';

const insights = insightModel;
const yahoo = new yahooRepository();

const getInsight = async (req: PostInsight): Promise<PostInsight> => {
  // const getInsight: GetInsight = await yahoo.findInsight(req);
  // const model = {
  //   timestamp: new Date().getTime(),
  //   name: getInsight.finance.result.symbol,
  //   meta: getInsight.finance.result,
  // };
  // const insights: GetInsight = await insights.create(model);
  // return insights;
  return await yahoo.findInsight(req);
};

export { getInsight };
