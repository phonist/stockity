import { model, Schema, Document } from 'mongoose';
import { Quote } from '@interfaces/quotes.interface';

const quoteSchema: Schema = new Schema(
  { timestamp: Number, name: String, meta: Object },
  {
    timeseries: {
      timeField: 'timestamp',
      metaField: 'name',
      granularity: 'minutes',
    },
    autoCreate: false,
    expireAfterSeconds: 86400,
  },
);

const quoteModel = model<Quote & Document>('Quote', quoteSchema);

export default quoteModel;
