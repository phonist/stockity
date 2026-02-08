import { model, Schema, Document } from 'mongoose';
import { Insight } from '@/features/insights/insights.interfaces';

const insightSchema: Schema = new Schema(
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

const insightModel = model<Insight & Document>('Insight', insightSchema);

export default insightModel;
