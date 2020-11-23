import { Router, Request, Response } from 'express';
import AmazonProduct from '../models/amazon.product';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const results = await AmazonProduct.find({});
    res.json(results).status(200);
  } catch (error) {
    console.log(error);
  }
});

export default router;
