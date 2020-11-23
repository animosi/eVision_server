import * as mongoose from 'mongoose';

export interface IAmazonproduct extends mongoose.Document {
  title: string;
  price: string;
  manufacturer: string;
  rating: string;
  totalRatings: string;
}
const amazonProdSchema = new mongoose.Schema({
  title: String,
  price: String,
  manufacturer: String,
  rating: String,
  totalRatings: String,
});

const AmazonProduct = mongoose.model<IAmazonproduct>(
  'AmazonProduct',
  amazonProdSchema
);

export default AmazonProduct;
