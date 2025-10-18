import type { RIOT_QUEUE_KEYS } from "../riot";

export type AggregateLeagueMatch = {
  assists: number;
  championId: number;
  crowdControlScore: number;
  damageDealtToBuildings: number;
  deaths: number;
  doubleKills: number;
  firstBlood: number;
  firstTowerKill: number;
  gameMode: string;
  goldEarned: number;
  kills: number;
  magicalDamage: number;
  magicalDamageTaken: number;
  pentaKills: number;
  physicalDamage: number;
  physicalDamageTaken: number;
  quadraKills: number;
  totalMatches: number;
  tripleKills: number;
  trueDamage: number;
  trueDamageTaken: number;
  win: number;
};
// export type QueueTypeToLeagueMatch = Record<number, AggregateLeagueMatch>;

export interface QueueTypeToLeagueMatch {
  [championId: number]: AggregateLeagueMatch;
  totalMatches?: number;
}

export type AggregateLeagueMatches = Record<RIOT_QUEUE_KEYS, QueueTypeToLeagueMatch>;
