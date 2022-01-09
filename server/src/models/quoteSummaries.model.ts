import { model, Schema, Document } from 'mongoose';
import { QuoteSummary } from '@interfaces/quoteSummaries.interface';

const quoteSummarySchema: Schema = new Schema(
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

const quoteSummaryModel = model<QuoteSummary & Document>('QuoteSummary', quoteSummarySchema);

export default quoteSummaryModel;
