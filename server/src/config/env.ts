const parseCsv = (value: string): string[] =>
  value
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);

const rawClientUrls = process.env.CLIENT_URLS || process.env.CLIENT_URL || process.env.CLIENT || 'http://localhost:3000';

const env = {
  port: Number(process.env.PORT || 8001),
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/stockity',
  mongoCaFile: process.env.MONGO_CA_FILE,
  jwtSecret: process.env.JWT_SECRET || process.env.jwtSecret || 'change-me',
  jwtExpire: process.env.JWT_EXPIRE || '5 days',
  clientUrl: rawClientUrls,
  allowedOrigins: parseCsv(rawClientUrls),
  environment: process.env.ENVIRONMENT || process.env.NODE_ENV || 'development',
};

export default env;
