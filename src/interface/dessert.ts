import { Document, Types } from "mongoose";

export interface IImage {
  desktop: string;
  tablet: string;
  mobile: string;
  thumbnail: string;
}

export interface IDessert extends Document {
  name: string;
  description: string;
  price: string;
  image: IImage;
}

/* export interface IDesserts {
  _id: string;
  name: string;
  description: string;
  price: string;
  image: IImage;
} */

export interface IDessertItemsProps {
  dessert: IDessert;
}

export interface order {
  dessertId: string;
  qte: number;
}

export interface IOrder extends Document {
  dessert: {
    dessert: IDessert;
    quantity: number;
  }[];
  total: number;
  createdAt: Date;
}

export interface ICreateOrder {
  dessert: {
    dessert: Types.ObjectId;
    quantity: number;
  }[];
  total: number;
}
