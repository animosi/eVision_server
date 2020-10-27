import * as express from 'express';
import config from './config/app';
import middlewareConfig from './config/middleware';
import connectDb from './config/databases';
import routes from './routes/routes';

const app: express.Application = express();

connectDb(config.mongoDbUri);

middlewareConfig(app);

routes(app);

app.listen(config.port, () => console.log(`Server Up : ${config.port}`));
