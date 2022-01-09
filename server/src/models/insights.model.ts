import { model, Schema, Document } from 'mongoose';
import { Insight } from '@interfaces/insights.interface';

const insightSchema: Schema = new Schema(
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

const insightModel = model<Insight & Document>('Insight', insightSchema);

export default insightModel;
