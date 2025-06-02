import { IDessert, IImage } from "@/interface/dessert";
import mongoose, { Schema } from "mongoose";

const imageSchema: Schema<IImage> = new Schema({
  desktop: { type: String, required: true },
  tablet: { type: String, required: true },
  mobile: { type: String, required: true },
  thumbnail: { type: String, required: true },
});

const dessertSchema: Schema<IDessert> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: imageSchema, required: true },
});

export const Dessert =
  mongoose.models.Dessert || mongoose.model<IDessert>("Dessert", dessertSchema);
