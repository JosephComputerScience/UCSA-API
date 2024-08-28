import axios from 'axios';
import { getRiotHeaders } from '../utils/riot/getRiotHeaders';
import { IRiotSummonerService } from './interfaces/IRiotSummonterService';
import { PLATFORM_HOST_URL } from '../constants';
import { RiotSummoner } from '../models/RiotSummoner';
import { RiotSummonerDTO } from '../dto/RiotSummonerDTO';

export class RiotSummonerService implements IRiotSummonerService {
  findByPuuid = async (puuid: string): Promise<RiotSummoner> => {
    try {
      const url = `${PLATFORM_HOST_URL}/lol/summoner/v4/summoners/by-puuid/${encodeURIComponent(
        puuid
      )}`;
      const headers = getRiotHeaders();
      const resp = await axios.get<RiotSummonerDTO>(url, { headers });
      const { accountId, profileIconId, revisionDate, id, summonerLevel } =
        resp.data;

      return new RiotSummoner(
        accountId,
        profileIconId,
        new Date(revisionDate),
        id,
        puuid,
        summonerLevel
      );
    } catch {
      throw new Error(`Could not find Riot summoner by puuid: ${puuid}`);
    }
  };
}
