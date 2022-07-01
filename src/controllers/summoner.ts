// external imports
import { Request } from 'express';
// local imports
import { getSummonerByName } from '../services/summoner';
// enums
import { PLATFORMS } from '../enums';
import { BadRequestError } from '../errorHandler/BadRequestError';
import { SummonerDTO } from '../models/summoner';

/**
 * Controller checks to see if platform is of type enum PLATFORMS.
 * If not a bad request error is thrown.
 * @param summonerName Name of the summoner
 * @param platform Name of the platform, for example na1
 * @returns SummonerDTO
 */
export const getSummonerByNamePlatform = async (
  summonerName: string,
  platform: string
) => {
  for (const value of Object.values(PLATFORMS)) {
    if (platform === value) {
      return (await getSummonerByName(summonerName, platform)) as SummonerDTO;
    }
  }
  throw new BadRequestError(
    `Proper platform param was not passed. Platform must be one of these value [${Object.values(
      PLATFORMS
    ).join(' | ')}]`
  );
};
