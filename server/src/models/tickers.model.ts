import { model, Schema, Document } from 'mongoose';
import { Ticker } from '@/features/tickers/tickers.interfaces';

const tickerSchema: Schema = new Schema(
  { timestamp: Array, meta: Object, indicators: Object },
  ({
    timeseries: {
      timeField: 'timestamp',
      metaField: 'meta',
      granularity: 'minutes',
    },
    autoCreate: false,
    expireAfterSeconds: 86400,
  } as any),
);

const tickerModel = model<Ticker & Document>('Ticker', tickerSchema);

export default tickerModel;
