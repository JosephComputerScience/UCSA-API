import axios from 'axios';
import { getRiotHeaders } from '../utils/getRiotHeaders';
import { IRiotAccountService } from './interfaces/IRiotAccountService';
import { REGIONAL_HOST_URL } from '../constants';
import { RiotAccount } from '../models/RiotAccount';
import { RiotAccountDTO } from '../dto/RiotAccountDTO';

export class RiotAccountService implements IRiotAccountService {
  findByPuuid = async (puuid: string): Promise<RiotAccount> => {
    const url = `${REGIONAL_HOST_URL}/riot/account/v1/accounts/by-puuid/${puuid}`;
    const headers = getRiotHeaders();

    const resp = await axios.get<RiotAccountDTO>(url, { headers });

    const { gameName, tagLine } = resp.data;
    return new RiotAccount(gameName, puuid, tagLine);
  };

  findByNameTagLine = async (
    gameName: string,
    tagLine: string
  ): Promise<RiotAccount> => {
    const url = `${REGIONAL_HOST_URL}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
    const headers = getRiotHeaders();

    const resp = await axios.get<RiotAccountDTO>(url, { headers });

    const { puuid } = resp.data;
    return new RiotAccount(gameName, puuid, tagLine);
  };
}
