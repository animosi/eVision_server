import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + './../../.env' });

export default {
  port: process.env.PORT,
  mongoDbUri: process.env.MONGODB_URI,
  instaPass: process.env.INSTA_PASS,
  instaUser: process.env.INSTA_USER,
  token: process.env.TOKEN_KEY,
};
