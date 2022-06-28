// external imports
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// local imports
import { get } from '../lol';
// enums & models
import {
  RIOT_ROOT_URL,
  SUMMONER_ENDPOINT,
  SUMMONER_VERSION_4,
} from '../../enums';
import { SummonerDTO } from '../../models/summoner';

/**
 * Gets the summoner based on the summonerName and the platform which that summonerName exist.
 * @param summonerName Name of the summoner
 * @param platform Platform to search the riot api. Example na1
 * @returns SummonerDTO
 */
export const getSummonerByName = async (
  summonerName: string,
  platform: string
) => {
  try {
    const url = `https://${platform}.${RIOT_ROOT_URL}/${SUMMONER_ENDPOINT}/${SUMMONER_VERSION_4}/summoners/by-name/${summonerName}`;
    const resp = await get<SummonerDTO>(url);
    return resp.data;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
      throw e;
    }
  }
};
