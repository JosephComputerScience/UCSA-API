// external imports
import Router from 'express-promise-router';
// local imports
import { v1Router } from './routes';

export const router = Router();

// v1 routes are prefixed with 1.
router.use('/1', v1Router);
