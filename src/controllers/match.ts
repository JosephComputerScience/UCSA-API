// external imports
import { Request } from 'express';
// local imports
import { getMatchesByPuid, getMatchByMatchId } from '../services/match';
// enums
import { REGIONS } from '../enums';
import { BadRequestError } from '../errorHandler/BadRequestError';
import { SummonerDTO } from '../models/summoner';
import { matchDataByChamp } from '../services/match/matchDataByChamp';

/**
 * Controller checks to see if region is of type enum REGIONS.
 * If not a bad request error is thrown.
 * @param puuid Encrypted PUUID
 * @param region Name of the region, for example americas
 * @returns List[string] of match ids
 */
export const getMatchesByPuidAndRegion = async (
  puuid: string,
  region: string,
  count: number,
) => {

  // Handling default if there is no set count, count > 100, or count < 0
  if (Number.isNaN(count) || count > 100 || count < 0) {
    count = 20
  }
  
  for (const value of Object.values(REGIONS)) {
    if (region === value) {
      return (await getMatchesByPuid(puuid, region, count));
    }
  }
  throw new BadRequestError(
    `Proper region param was not passed. Region must be one of these value [${Object.values(
      REGIONS
    ).join(' | ')}]`
  );
};

/**
 * Controller checks to see if region is of type enum REGIONS.
 * If not a bad request error is thrown.
 * @param puuid Encrypted PUUID
 * @param region Name of the region, for example americas
 * @returns Map<string, MatchDTO[]> 
 */
 export const getMatchByMatchIdAndRegion = async (
  matchId: string,
  region: string
) => {
  for (const value of Object.values(REGIONS)) {
    if (region === value) {
      return (await getMatchByMatchId(matchId, region));
    }
  }
  throw new BadRequestError(
    `Proper region param was not passed. Region must be one of these value [${Object.values(
      REGIONS
    ).join(' | ')}]`
  );
};

/**
 * Controller checks to see if region is of type enum REGIONS.
 * If not a bad request error is thrown.
 * @param matchId Unique match ID, for example NA1_4356536467
 * @param region Name of the region, for example americas
 * @returns MatchDTO
 */
 export const groupDataByChamp = async (
  puuid: string,
  region: string,
  count: number,
) => {
  for (const value of Object.values(REGIONS)) {
    if (region === value) {
      return (await matchDataByChamp(region,puuid,count));
    }
  }
  throw new BadRequestError(
    `Proper region param was not passed. Region must be one of these value [${Object.values(
      REGIONS
    ).join(' | ')}]`
  );
};
