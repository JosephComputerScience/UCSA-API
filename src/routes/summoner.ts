// external imports
import { Request, Response } from 'express';
import Router from 'express-promise-router';
// local imports
// controllers
import { getSummonerByNamePlatform } from '../controllers/summoner';

// summoner router
export const summonerRouter = Router();
// summoner router root endpoint
summonerRouter.use('/summoner', summonerRouter);

summonerRouter
  .route('/:platform/:summonerName')
  .get(async (req: Request, res: Response) => {
    const summoner = await getSummonerByNamePlatform(
      req.params.summonerName as string,
      req.params.platform as string
    );
    res.status(200).json({ ...summoner });
  });
