// local imports
import {
  getMatchesByPuuid,
  getMatchByMatchId,
  matchDataByChamp,
} from '../services/match';
// enums
import { REGIONS } from '../enums';
import { BadRequestError } from '../errorHandler/BadRequestError';

/**
 * Controller checks to see if region is of type enum REGIONS.
 * If not a bad request error is thrown.
 * @param puuid Encrypted PUUID
 * @param region Name of the region, for example americas
 * @param count Number of matches to retrieve
 * @returns List[string] of match ids
 */
export const getMatchesByPuidAndRegion = async (
  puuid: string,
  region: string,
  count: number
) => {
  // Handling default if there is no set count, count > 100, or count < 0
  if (Number.isNaN(count) || count > 100 || count < 0) {
    count = 20;
  }

  for (const value of Object.values(REGIONS)) {
    if (region === value) {
      return await getMatchesByPuuid(puuid, region, count);
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
 * @param count Number of matches to retrieve
 * @returns JS object, key is champion name, value is a list of Match DTOs
 */
export const getMatchByMatchIdAndRegion = async (
  matchId: string,
  region: string
) => {
  for (const value of Object.values(REGIONS)) {
    if (region === value) {
      return await getMatchByMatchId(matchId, region);
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
 * @returns MatchDTO
 */
export const groupDataByChamp = async (
  puuid: string,
  region: string,
  count: number
) => {
  // Default case, sets count to 20 if count > 100 or negative
  if (Number.isNaN(count) || count > 100 || count < 0) {
    count = 20;
  }
  for (const value of Object.values(REGIONS)) {
    if (region === value) {
      return await matchDataByChamp(region, puuid, count);
    }
  }
  throw new BadRequestError(
    `Proper region param was not passed. Region must be one of these value [${Object.values(
      REGIONS
    ).join(' | ')}]`
  );
};
