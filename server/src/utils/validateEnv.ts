import { cleanEnv, port, str } from 'envalid';
import env from './config/env';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
  });
};

export default validateEnv;
