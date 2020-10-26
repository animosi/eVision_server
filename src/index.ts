import * as express from 'express';
import config from './config/app';
import middlewareConfig from './config/middleware';
import connectDb from './config/databases';

const app:express.Application = express();

connectDb(config.mongoDbUri);

middlewareConfig(app);

app.listen(config.PORT,()=>console.log(`Server Up : ${config.PORT}`));