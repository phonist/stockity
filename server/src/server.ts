import 'dotenv/config';
import '@/index';
import App from '@/app';
import {
  AuthRoute,
  AutoCompletesRoute,
  IndexRoute,
  InsightsRoute,
  QuoteSummariesRoute,
  QuotesRoute,
  TickersRoute,
  UsersRoute,
} from '@/features';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new TickersRoute(),
  new QuotesRoute(),
  new QuoteSummariesRoute(),
  new InsightsRoute(),
  new AutoCompletesRoute(),
]);

app.listen();
