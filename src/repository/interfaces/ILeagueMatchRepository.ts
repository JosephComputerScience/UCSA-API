import type { LeagueMatch } from "@/models/riotMatches/LeagueMatch";

export interface ILeagueMatchRepository {
  deleteAllMatchesByPuuid(puuid: string): Promise<void>;
  getAllMatchesByPuuid(puuid: string): Promise<LeagueMatch[]>;
}
