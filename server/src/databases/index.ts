import config from 'config';
import { dbConfig } from '@interfaces/db.interface';

const { host, port, database }: dbConfig = config.get('dbConfig');

export const dbConnection = {
  // url: `mongodb://${host}:${port}/${database}`,
  url: process.env.MONGO_DB_CONNECTION_STRING_DEV,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
