import userRoute from './auth/user';
import amazonRoute from './product';

export default (app: any) => {
  app.use('/user', userRoute);
  app.use('/product', amazonRoute);
};
