import 'dotenv/config';
import '@/index';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import TickersRoute from '@routes/tickers.route';
import QuotesRoute from '@routes/quotes.route';
import QuoteSummariesRoute from '@routes/quoteSummaries.route';
import InsightsRoute from '@routes/insights.route';
import AutoCompletesRoute from '@routes/autocompletes.route';
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
