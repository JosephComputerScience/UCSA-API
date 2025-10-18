import type { LeagueMatch } from "@/models/riotMatches/LeagueMatch";
import type { AggregateLeagueMatches } from "@/types";

export interface IMatchAggreGateService {
  aggregateMatches(matches: LeagueMatch[]): AggregateLeagueMatches;
}
