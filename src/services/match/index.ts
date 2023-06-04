// local imports
import { get } from '../lol';
// enums & models
import { RIOT_ROOT_URL, MATCH_ENDPOINT, MATCH_VERSION_5 } from '../../enums';
import { MatchDTO } from '../../models/match';

/**
 * Gets the list of match ids based on the puuid and the region which that summonerName exist.
 * @param puuid Encrypted PUUID
 * @param region Name of the region, for example americas
 * @param count Number of matches to retrieve
 * @returns List[string] of match ids
 */
export const getMatchesByPuuid = async (
  puuid: string,
  region: string,
  count: number
): Promise<string[]> => {
  try {
    const url = `https://${region}.${RIOT_ROOT_URL}/${MATCH_ENDPOINT}/${MATCH_VERSION_5}/matches/by-puuid/${puuid}/ids?count=${count}`;
    const resp = await get<string[]>(url);
    if (resp.data) {
      return resp.data;
    }
    return [] as string[];
    // return resp.data as string[];
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log(e);
    }
    throw e;
  }
};

/**
 * Gets the match based on the matchId and the region which that summonerName exist.
 * @param matchId Unique match ID, for example NA1_4356536467
 * @param region Name of the region, for example americas
 * @returns MatchDTO
 */
export const getMatchByMatchId = async (matchId: string, region: string) => {
  try {
    const url = `https://${region}.${RIOT_ROOT_URL}/${MATCH_ENDPOINT}/${MATCH_VERSION_5}/matches/${matchId}`;
    const resp = await get<MatchDTO>(url);
    return resp.data;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log(e);
    }
    throw e;
  }
};

/**
 * Group matches for a player by champions.
 * @param puuid Encrypted PUUID
 * @param region Name of the region, for example americas
 * @param count Number of matches to retrieve
 * @returns Map<number, MatchDTO[]>
 */
export const matchDataByChamp = async (
  region: string,
  puuid: string,
  count: number
) => {
  try {
    let matchIds = await getMatchesByPuuid(puuid, region, count);
    let matchesByChampId = new Map<number, MatchDTO[]>();

    for (const matchId of matchIds) {
      const match = await getMatchByMatchId(matchId, region);
      const { info } = match;
      for (const participant of info.participants) {
        if (participant.puuid === puuid) {
          const { championId } = participant;
          if (!matchesByChampId.has(championId)) {
            matchesByChampId.set(championId, []);
          }
          // match is a huge dto, this could lead to some serious memory abuse
          // for grouping the entire match, need to create a dto for what we
          // really want
          matchesByChampId.get(championId)!.push(match);
        }
      }
    }
    return matchesByChampId;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log(e);
    }
    throw e;
  }
};
