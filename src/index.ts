import * as express from 'express';
import config from './config/app';
import middlewareConfig from './config/middleware';
import connectDb from './config/databases';
import routes from './routes/routes';
import amazon from './services/web/amazon';

const app: express.Application = express();

const link = `https://www.amazon.com/ASUS-ROG-Zephyrus-i7-10750H-Backlight/dp/B08DG196CC/ref=sr_1_8_mod_primary_new?crid=THGVYCUUE31A&dchild=1&keywords=g14+zephyrus&qid=1606117881&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=g14+z%2Caps%2C417&sr=8-8`;

connectDb(config.mongoDbUri);

middlewareConfig(app);

routes(app);

app.listen(config.port, () => console.log(`Server Up : ${config.port}`));

(async () => {
  await amazon.initialize();
  await amazon.getProduct(link);
})();
