import { IOrder } from "@/interface/dessert";
import { model, Schema, Types } from "mongoose";
import mongoose from "mongoose";

const OrderSchema = new Schema<IOrder>({
  dessert: [
    {
      dessert: {
        type: Schema.Types.ObjectId,
        ref: "Dessert",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],

  total: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || model<IOrder>("Order", OrderSchema);

export default Order;
