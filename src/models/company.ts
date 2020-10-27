import { Document, Schema, model } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  country: string;
  city: string;
  state: string;
  postalCode: number;
  street: string;
  website: string;
}

const companySchema = new Schema({
  name: { type: String, trim: true, required: true },
  country: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  postalCode: { type: Number, trim: true },
  street: { type: String, trim: true },
  website: { type: String, trim: true },
});

const Company = model<ICompany>('Company', companySchema);

export default Company;
