import { Schema, Document } from "mongoose";
import * as mongoose from "mongoose";

export interface IExpenses extends Document {
  month: number;
  year: number;
  name: string;
  value: number;
}
const ExpensesSchema: Schema = new Schema({
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

ExpensesSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Expenses = mongoose.model<IExpenses>("expenses", ExpensesSchema);
export default Expenses;
