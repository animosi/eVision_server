import { Document, Schema, model, Model } from 'mongoose';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  tokens: [{ token: string }];
  generateAuthToken: () => string;
}
export interface ISModel extends Model<IUser> {
  findByCredentials: (email: string, password: string) => IUser;
}

export interface IRequest extends Request {
  example: string; // == req.example
}

export const userSchema = new Schema({
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

userSchema.methods.generateAuthToken = async function (): Promise<string> {
  const user = this;
  try {
    const token = jwt.sign({ _id: user._id }, 'scrapesafe');
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
  } catch (err) {
    console.log(err);
  }
};
userSchema.statics.findByCredentials = async (
  email,
  password
): Promise<IUser> => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Unable to login');
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) throw new Error('Unable to login');

    return user;
  } catch (err) {
    console.log(err);
  }
};

userSchema.pre('save', async function (
  this: IUser,
  next: Function
): Promise<void> {
  let user = this;
  if (user.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    } catch (err) {
      console.log(err);
    }
  }
  next();
});

const User = model<IUser, ISModel>('User', userSchema);
export default User;
