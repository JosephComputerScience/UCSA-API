import { RIOT_PLATFORM_HOST_URL, RIOT_REGIONAL_HOST_URL } from "@/constants";
import type { RiotAccountDTO } from "@/dto/RiotAccountDTO";
import type { RiotMatchDTO } from "@/dto/RiotMatchDTO";
import type { RiotSummonerDTO } from "@/dto/RiotSummonerDTO";
import type { RiotAccount } from "@/models/RiotAccount";
import { RiotSummoner } from "@/models/RiotSummoner";
import type { AxiosResponse } from "axios";
import type { IRiotRepository } from "./interfaces/IRiotRepository";
import { riotClient } from "./riotClient";

export class RiotRepository implements IRiotRepository {
  getAccountByPuuid = async (puuid: string): Promise<RiotAccount> => {
    try {
      const url = `${RIOT_REGIONAL_HOST_URL}/riot/account/v1/accounts/by-puuid/${puuid}`;
      const resp: AxiosResponse<RiotAccountDTO> = await riotClient({ url, method: "GET" });

      const { gameName: summonerName, tagLine } = resp.data;
      return { summonerName, puuid, tagLine };
    } catch {
      throw new Error(`Could not find Riot account with puuid: ${puuid}`);
    }
  };

  getAccountBySummonerNameTagLine = async (summonerName: string, tagLine: string): Promise<RiotAccount> => {
    try {
      const url = `${RIOT_REGIONAL_HOST_URL}/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagLine}`;
      const resp: AxiosResponse<RiotAccountDTO> = await riotClient({ url, method: "GET" });
      const { puuid } = resp.data;
      return { summonerName, puuid, tagLine };
    } catch {
      throw new Error(`Could not find Riot account with summoner name: ${summonerName} and tag line: ${tagLine}`);
    }
  };

  getMatchIdsByPuuid = async (puuid: string, queueId: number, count = 20): Promise<string[]> => {
    const url = `${RIOT_REGIONAL_HOST_URL}/lol/match/v5/matches/by-puuid/${puuid}/ids`;
    const resp: AxiosResponse<string[]> = await riotClient({ url, method: "GET", params: { queue: queueId, count } });
    return resp.data;
  };

  getMatchesByMatchIds = async (matchIds: string[]) => {
    const matchPromises = matchIds.map((id) => {
      const url = `${RIOT_REGIONAL_HOST_URL}/lol/match/v5/matches/${id}`;
      return riotClient<RiotMatchDTO>({ url, method: "GET" });
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
    return matches;
  };

  getSummonerByPuuid = async (puuid: string): Promise<RiotSummoner> => {
    try {
      const url = `${RIOT_PLATFORM_HOST_URL}/lol/summoner/v4/summoners/by-puuid/${encodeURIComponent(puuid)}`;
      const resp: AxiosResponse<RiotSummonerDTO> = await riotClient({ url, method: "GET" });
      const { profileIconId, revisionDate, summonerLevel } = resp.data;

      return new RiotSummoner(profileIconId, new Date(revisionDate), puuid, summonerLevel);
    } catch {
      throw new Error(`Could not find Riot summoner by puuid: ${puuid}`);
    }
  };
}
