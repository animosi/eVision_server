import userRoute from './auth/user';
import amazonRoute from './product';
import notFoundRoute from './404';

export default (app: any) => {
  app.use('/user', userRoute);
  app.use('/product', amazonRoute);
  app.use('*', notFoundRoute);
};
