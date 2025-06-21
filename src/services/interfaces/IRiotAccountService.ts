import type { RiotAccount } from "@/models/RiotAccount";

/**
 * Riot third party api connecting to the account endpoint - https://developer.riotgames.com/apis#account-v1
 */
export interface IRiotAccountService {
  getAccountByPuuid(puuid: string): Promise<RiotAccount>;
  getAccountBySummonerNameTagLine(summonerName: string, tagLine: string): Promise<RiotAccount>;
}
