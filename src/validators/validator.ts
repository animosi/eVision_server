import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export default {
  registeration: async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
      name: Joi.string().min(3).max(30).trim().required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .trim()
        .required(),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
        .required(),
    });

    const { error } = await schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .trim()
        .required(),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
        .required(),
    });

    const { error } = await schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  },
  amazonProduct: async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
      title: Joi.string(),
      price: Joi.string(),
      manufacturer: Joi.string(),
      rating: Joi.string(),
      totalRatings: Joi.string(),
    });
    const { error } = await schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  },
};
