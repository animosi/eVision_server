import { Router } from 'express';
import controller from '../controllers/product.controller';
import validator from '../validators/validator';
import auth from './../middleware/auth';

const router: Router = Router();

// router.use(auth); //* enable jwt auth for all routes

router.get('/', controller.getAllProducts);

router.get('/:id', controller.getProductById);

router.post('/', validator.amazonProduct, controller.addProduct);

router.delete('/:id', controller.deleteProductById);

export default router;
