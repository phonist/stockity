import insightModel from '@/models/insights.model';
import { GetInsight, PostInsight } from '@/features/insights/insights.interfaces';
import finhubRepository from '../tickers/repositories/finhub.repository';

const insights = insightModel;
const finhub = new finhubRepository();

const getInsight = async (req: PostInsight): Promise<GetInsight> => {
  // const getInsight: GetInsight = await finhub.findInsight(req);
  // const model = {
  //   timestamp: new Date().getTime(),
  //   name: getInsight.finance.result.symbol,
  //   meta: getInsight.finance.result,
  // };
  // const insights: GetInsight = await insights.create(model);
  // return insights;
  return await finhub.findInsight(req);
};

export { getInsight };
