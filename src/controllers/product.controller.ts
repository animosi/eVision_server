import { Request, Response } from 'express';
import AmazonProduct from '../models/amazon.product';

export default {
  //TODO build validator for add product
  addProduct: async (req: Request, res: Response) => {
    try {
      const entry = new AmazonProduct(req.body);
      await entry.save();
      res.status(201).json({ entry, message: 'entry added' });
    } catch (err) {
      res.send(500).send(err);
    }
  },
  getAllProducts: async (req: Request, res: Response) => {
    try {
      const results = await AmazonProduct.find({});
      res.json(results).status(200);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  getProductById: async (req: Request, res: Response) => {
    try {
      const entry = await AmazonProduct.findById(req.params.id);
      if (!entry) return res.status(400).send('No entry found');
      res.status(200).send(entry);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteProductById: async (req: Request, res: Response) => {
    try {
      const entry = await AmazonProduct.findByIdAndDelete(req.params.id);
      if (!entry) return res.status(400).send('No entry found');
      res.status(201).send({ entry, message: 'entry deleted' });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
