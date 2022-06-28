// external imports
import Router from 'express-promise-router';
// routes
import { summonerRouter } from './summoner';

export const v1Router = Router();

v1Router.use(summonerRouter);
