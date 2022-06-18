// external imports
import { Request, Response } from 'express';
import Router from 'express-promise-router';

export const v1Router = Router();

// TODO: delete me
v1Router.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ hi: 'hi' });
});
