import { Document, Schema, model } from 'mongoose';

export interface IProduct extends Document {
  manufacturer: string;
  sku: string;
  stock: number;
  class: string;
  title: string;
  description: string;
  rating: number;
  pricing: {
    price: number;
    discount: number;
  };
  shippingDetails: {
    provider: string;
    international: boolean;
    cost: number;
    weight: number;
    height: number;
    width: number;
    depth: number;
    deliveryDate: {
      month: string;
      day: number;
      year: number;
      time: number;
    };
  };
}

const productSchema = new Schema({
  manufacturer: { type: String, trim: true },
  sku: { type: String, trim: true },
  stock: { type: Number, trim: true },
  class: { type: String, trim: true },
  title: { type: String, trim: true },
  description: { type: String, trim: true },
  rating: { type: Number, trim: true },
  pricing: {
    price: { type: Number, trim: true },
    discount: { type: Number, trim: true },
  },
  shippingDetails: {
    provider: { type: String, trim: true },
    international: { type: Boolean, trim: true },
    cost: { type: Number, trim: true },
    weight: { type: Number, trim: true },
    height: { type: Number, trim: true },
    width: { type: Number, trim: true },
    depth: { type: Number, trim: true },
    deliveryDate: {
      month: { type: String, trim: true },
      day: { type: Number, trim: true },
      year: { type: Number, trim: true },
      time: { type: Number, trim: true },
    },
  },
});

const Product = model<IProduct>('Product', productSchema);

export default Product;
