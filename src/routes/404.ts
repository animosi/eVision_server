import { Router, Response, Request } from 'express';
const router: Router = Router();

router.get('/', (req: Request, res: Response) =>
  res.json({ error: 'Page not found' })
);

export default router;
