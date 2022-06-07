// external imports
import { Request, Response } from 'express';
import Router from 'express-promise-router';

const router = Router();

// TODO: delete me
router.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Running' });
});
export default router;
