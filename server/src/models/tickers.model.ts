import { model, Schema, Document } from 'mongoose';
import { Ticker } from '@interfaces/tickers.interface';

const tickerSchema: Schema = new Schema(
  { timestamp: Array, meta: Object, indicators: Object },
  {
    timeseries: {
      timeField: 'timestamp',
      metaField: 'meta',
      granularity: 'minutes',
    },
    autoCreate: false,
    expireAfterSeconds: 86400,
  },
);

const tickerModel = model<Ticker & Document>('Ticker', tickerSchema);

export default tickerModel;
