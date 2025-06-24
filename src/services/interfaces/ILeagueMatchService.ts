import type { LeagueMatch } from "@/models/riotMatches/LeagueMatch";

export interface ILeagueMatchService {
  getMatchesByPuuid(puuid: string): Promise<LeagueMatch[] | null>;
  deleteMatchesByPuuid(puuid: string): void;
}
