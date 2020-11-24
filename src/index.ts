import * as express from 'express';
import config from './config/app';
import middlewareConfig from './config/middleware';
import connectDb from './config/databases';
import routes from './routes/routes';
import amazon from './services/web/amazon';
import twitter from './services/web/twitter';
import agoda from './services/web/agoda';

const app: express.Application = express();

connectDb(config.mongoDbUri);

middlewareConfig(app);

routes(app);

app.listen(config.port, () => console.log(`Server Up : ${config.port}`));

// (async () => {
//   await amazon.initialize();
//   await amazon.getProduct(link);
// })();

// (async () => {
//   await twitter.initialize();
//   await twitter.scrape();
// })();

// agoda();
