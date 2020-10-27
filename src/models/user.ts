import { Document, Schema, model } from 'mongoose';

//TODO add googleID
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  tokens: [{ token: string }];
}

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, trim: true, required: true },
  password: { type: String, required: true },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

const User = model<IUser>('User', userSchema);
export default User;
