// external imports
import Router from 'express-promise-router';
// routes
import { summonerRouter } from './summoner';
import { matchRouter } from './match';

export const v1Router = Router();

v1Router.use(summonerRouter);
v1Router.use(matchRouter);