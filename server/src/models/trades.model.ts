import { model, Schema, Document } from 'mongoose';
import { Trade } from '@interfaces/trading.interface';

const tradeSchema: Schema = new Schema(
  {
    symbol: { type: String, required: true },
    side: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
    executedAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

const tradeModel = model<Trade & Document>('Trade', tradeSchema);

export default tradeModel;
