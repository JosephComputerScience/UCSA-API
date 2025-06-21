import type { RiotSummoner } from "@/models/RiotSummoner";

/**
 * Riot third party api connecting to the summoner endpoint - https://developer.riotgames.com/apis#summoner-v4
 */
export interface IRiotSummoner {
  getSummonerByPuuid(puuid: string): Promise<RiotSummoner>;
}
