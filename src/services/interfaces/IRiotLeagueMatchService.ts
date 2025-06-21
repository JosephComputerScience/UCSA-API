import type { RiotMatchDTO } from "@/dto/RiotMatchDTO";

/**
 * Riot third party api connecting to the league match endpoint - https://developer.riotgames.com/apis#match-v5
 */
export interface IRiotLeagueMatchService {
  getMatchIdsByPuuid: (puuid: string, queueId: number, count: number) => Promise<string[]>;
  getMatchesByMatchIds: (matchIds: string[]) => Promise<RiotMatchDTO[]>;
}
