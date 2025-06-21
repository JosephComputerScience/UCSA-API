import { RIOT_PLATFORM_HOST_URL, RIOT_REGIONAL_HOST_URL } from "@/constants";
import type { RiotAccountDTO } from "@/dto/RiotAccountDTO";
import type { RiotMatchDTO } from "@/dto/RiotMatchDTO";
import type { RiotSummonerDTO } from "@/dto/RiotSummonerDTO";
import type { RiotAccount } from "@/models/RiotAccount";
import { RiotSummoner } from "@/models/RiotSummoner";
import { request } from "@/utils/request";
import { getRiotHeaders } from "@/utils/riot/getRiotHeaders";
import type { AxiosResponse } from "axios";
import type { IRiotRepository } from "./interfaces/IRiotRepository";

export class RiotRepository implements IRiotRepository {
  private _riotHeaders = getRiotHeaders();

  getAccountByPuuid = async (puuid: string): Promise<RiotAccount> => {
    try {
      const url = `${RIOT_REGIONAL_HOST_URL}/riot/account/v1/accounts/by-puuid/${puuid}`;
      const resp: AxiosResponse<RiotAccountDTO> = await request.get(url, {
        headers: this._riotHeaders,
      });
      const { gameName: summonerName, tagLine } = resp.data;
      return { summonerName, puuid, tagLine };
    } catch {
      throw new Error(`Could not find Riot account with puuid: ${puuid}`);
    }
  };

  getAccountBySummonerNameTagLine = async (summonerName: string, tagLine: string): Promise<RiotAccount> => {
    try {
      const url = `${RIOT_REGIONAL_HOST_URL}/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagLine}`;
      const resp: AxiosResponse<RiotAccountDTO> = await request.get(url, {
        headers: this._riotHeaders,
      });
      const { puuid } = resp.data;
      return { summonerName, puuid, tagLine };
    } catch {
      throw new Error(`Could not find Riot account with summoner name: ${summonerName} and tag line: ${tagLine}`);
    }
  };

  getMatchIdsByPuuid = async (puuid: string, queueId: number, count = 20): Promise<string[]> => {
    const url = `${RIOT_REGIONAL_HOST_URL}/lol/match/v5/matches/by-puuid/${puuid}/ids`;
    const resp: AxiosResponse<string[]> = await request.get(url, {
      headers: this._riotHeaders,
      params: { queue: queueId, count },
    });
    return resp.data;
  };

  getMatchesByMatchIds = async (matchIds: string[]) => {
    const matchPromises = matchIds.map((id) => {
      const url = `${RIOT_REGIONAL_HOST_URL}/lol/match/v5/matches/${id}`;
      return request.get<RiotMatchDTO>(url, {
        headers: this._riotHeaders,
      });
    });
    const responses = await Promise.allSettled(matchPromises);
    const matches: RiotMatchDTO[] = [];
    const errors: string[] = [];
    responses.map((resp) => {
      if (resp.status === "fulfilled") {
        matches.push(resp.value.data);
      } else {
        errors.push(resp.reason);
      }
    });
    console.log("RIOT_SERVICE", `getMatchesByIds errors: ${JSON.stringify(errors)}`);
    return matches;
  };

  getSummonerByPuuid = async (puuid: string): Promise<RiotSummoner> => {
    try {
      const url = `${RIOT_PLATFORM_HOST_URL}/lol/summoner/v4/summoners/by-puuid/${encodeURIComponent(puuid)}`;
      const resp: AxiosResponse<RiotSummonerDTO> = await request.get(url, {
        headers: this._riotHeaders,
      });
      const { accountId, profileIconId, revisionDate, id, summonerLevel } = resp.data;

      return new RiotSummoner(accountId, profileIconId, new Date(revisionDate), id, puuid, summonerLevel);
    } catch {
      throw new Error(`Could not find Riot summoner by puuid: ${puuid}`);
    }
  };
}
