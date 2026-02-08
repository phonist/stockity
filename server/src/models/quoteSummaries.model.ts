import { model, Schema, Document } from 'mongoose';
import { QuoteSummary } from '@/features/quoteSummaries/quoteSummaries.interfaces';

const quoteSummarySchema: Schema = new Schema(
  { timestamp: Number, name: String, meta: Object },
  ({
    timeseries: {
      timeField: 'timestamp',
      metaField: 'name',
      granularity: 'minutes',
    },
    autoCreate: false,
    expireAfterSeconds: 86400,
  } as any),
);

const quoteSummaryModel = model<QuoteSummary & Document>('QuoteSummary', quoteSummarySchema);

export default quoteSummaryModel;
