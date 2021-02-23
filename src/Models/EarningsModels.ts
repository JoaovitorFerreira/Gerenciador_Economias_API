import { Schema, Document } from "mongoose";
import * as mongoose from "mongoose";

export interface IEarnings extends Document {
  month: number;
  year: number;
  name: string;
  value: number;
}
const EarningsSchema: Schema = new Schema({
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

EarningsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Earnings = mongoose.model<IEarnings>("earnings", EarningsSchema);
export default Earnings;
