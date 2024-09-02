import axios from 'axios';
import { getRiotHeaders } from '../utils/riot/getRiotHeaders';
import { IRiotAccountService } from './interfaces/IRiotAccountService';
import { REGIONAL_HOST_URL } from '../constants';
import { RiotAccount } from '../models/RiotAccount';
import { RiotAccountDTO } from '../dto/RiotAccountDTO';

/**
 * Retrieves account information from Riot about the user, not to be mistaken with game data such as LoL or Valorant, etc.
 *
 * Riot Account API - https://developer.riotgames.com/apis#account-v1
 */
export class RiotAccountService implements IRiotAccountService {
  findByPuuid = async (puuid: string): Promise<RiotAccount> => {
    try {
      const url = `${REGIONAL_HOST_URL}/riot/account/v1/accounts/by-puuid/${puuid}`;
      const headers = getRiotHeaders();

      const resp = await axios.get<RiotAccountDTO>(url, { headers });

      const { gameName, tagLine } = resp.data;
      return new RiotAccount(gameName, puuid, tagLine);
    } catch {
      throw new Error(`Could not find Riot account with puuid: ${puuid}`);
    }
  };

  findByNameTagLine = async (
    gameName: string,
    tagLine: string
  ): Promise<RiotAccount> => {
    try {
      const url = `${REGIONAL_HOST_URL}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
      const headers = getRiotHeaders();

      const resp = await axios.get<RiotAccountDTO>(url, { headers });

      const { puuid } = resp.data;
      return new RiotAccount(gameName, puuid, tagLine);
    } catch {
      throw new Error(
        `Could not find Riot account with summoner name: ${gameName} and tag line: ${tagLine}`
      );
    }
  };
}
