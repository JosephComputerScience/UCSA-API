import axios from 'axios';
import { getRiotHeaders } from '../utils/getRiotHeaders';
import { IRiotSummonerService } from './interfaces/IRiotSummonterService';
import { REGIONAL_HOST_URL } from '../constants';
import { RiotSummoner } from '../models/RiotSummoner';
import { RiotSummonerDTO } from '../dto/RiotSummonerDTO';

export class RiotSummonerDAO implements IRiotSummonerService {
  findByPuuid = async (puuid: string): Promise<RiotSummoner> => {
    const url = `${REGIONAL_HOST_URL}/lol/summoner/v4/summoners/by-puuid/${encodeURIComponent(
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
  };
}
