import * as express from 'express';
import { Application, Request, Response } from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as helmet from 'helmet';

export default (app: Application) => {
  app.use(cors());
  app.use(morgan('common'));
  app.use(helmet());

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.get('/', (req: Request, res: Response): object => {
    return res.json({ status: 'OK', message: 'Server up' });
  });
};
