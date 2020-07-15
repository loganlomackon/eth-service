import { Router, Request, Response } from 'express';

const router = Router();

router.get('/api/iotonchain/recent', (req: Request, res: Response) => {
  res.send('Hello World!');
});

router.get('/api/push', (req: Request, res: Response) => {
  res.send('Push World!');
});

export { router };
