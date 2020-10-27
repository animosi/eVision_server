import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/registration', (req: Request, res: Response): object => {
  return res.json({ message: 'Register route' });
});

router.get('/login', (req: Request, res: Response): object => {
  return res.json({ message: 'Login route' });
});

export default router;
