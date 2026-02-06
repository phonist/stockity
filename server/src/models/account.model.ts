import { model, Schema, Document } from 'mongoose';
import { Account } from '@interfaces/trading.interface';

const accountSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    cash: { type: Number, required: true },
    currency: { type: String, required: true, default: 'USD' },
    updatedAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

const accountModel = model<Account & Document>('Account', accountSchema);

export default accountModel;
