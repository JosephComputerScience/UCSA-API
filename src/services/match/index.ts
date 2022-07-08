// external imports
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// local imports
import { get } from '../lol';
// enums & models
import {
  RIOT_ROOT_URL,
  MATCH_ENDPOINT,
  MATCH_VERSION_5,
} from '../../enums';
import { MatchDTO } from '../../models/match';

/**
 * Gets the list of match ids based on the puuid and the region which that summonerName exist.
 * @param puuid Encrypted PUUID
 * @param region Name of the region, for example americas
 * @returns List[string] of match ids
 */
export const getMatchesByPuuid = async (
  puuid: string,
  region: string,
  count: number,
) => {
  try {
    const url = `https://${region}.${RIOT_ROOT_URL}/${MATCH_ENDPOINT}/${MATCH_VERSION_5}/matches/by-puuid/${puuid}/ids?count=${count}`;
    const resp = await get<string[]>(url);
    return resp.data;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
      throw e;
    }
  }
};

/**
 * Gets the match based on the matchId and the region which that summonerName exist.
 * @param matchId Unique match ID, for example NA1_4356536467
 * @param region Name of the region, for example americas
 * @returns MatchDTO
 */
 export const getMatchByMatchId = async (
    matchId: string,
    region: string
  ) => {
    try {
      const url = `https://${region}.${RIOT_ROOT_URL}/${MATCH_ENDPOINT}/${MATCH_VERSION_5}/matches/${matchId}`;
      const resp = await get<MatchDTO>(url);
      return resp.data;
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        throw e;
      }
    }
  };