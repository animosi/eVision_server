import userRoute from './auth/user';

export default (app: any) => {
  app.use('/user', userRoute);
};
