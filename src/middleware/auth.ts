import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../models/user';

//? get auth token from client; decode token; find user
const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'thisismynewcourse');
    //* find user with matching id+valid token
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }
    req.user = user; //* set req.user on req object
    next();
  } catch (err) {
    res.status(401).send(err);
  }
};
export default auth;
