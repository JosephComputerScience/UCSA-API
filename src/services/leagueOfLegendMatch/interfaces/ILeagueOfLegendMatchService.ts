import type { LeagueMatch } from "@/models/riotMatches/LeagueMatch";

export interface ILeagueOfLegendMatchService {
  getMatchesByPuuid(puuid: string): Promise<LeagueMatch[]>;
  deleteMatchesByPuuid(puuid: string): void;
  updateMatchesByPuuid(puuid: string): Promise<void>;
}
