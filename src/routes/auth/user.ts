import { Router, Request, Response } from 'express';
import validate from '../../validators/validator';
import User from '../../models/user';

const router: Router = Router();

router.post(
  '/registration',
  validate.registeration,
  async (req: Request, res: Response) => {
    try {
      const user = new User(req.body);
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

router.post('/login', validate.login, async (req: Request, res: Response) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
