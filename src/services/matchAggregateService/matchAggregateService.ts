import { RIOT_QUEUE_ID_TYPES } from "@/constants";
import type { LeagueMatch } from "@/models/riotMatches/LeagueMatch";
import type { AggregateLeagueMatch, AggregateLeagueMatches, QueueTypeToLeagueMatch, RIOT_QUEUE_KEYS } from "@/types";
import { getQueueName } from "@/utils/queueIdToName";
import type { IMatchAggreGateService } from "./interfaces/IMatchAggregateService";

/**
 * Gets the data in the database for the game type and aggregate the
 * stats that is relevant to the game
 *
 * Retrieves the users match history in the database.
 *
 * Uses the strategy pattern to encapsulate behavior to be able
 * to aggregate the stats from the game based on it's own relevant
 * stats
 *
 */
export class MatchAggregateService implements IMatchAggreGateService {
  aggregateMatches(matches: LeagueMatch[]) {
    const aggregatedMatchesByQueueId: AggregateLeagueMatches = {
      ARAM: {},
      NORMAL_BLIND: {},
      NORMAL_DRAFT: {},
      RANKED_FLEX: {},
      RANKED_SOLO: {},
    };
    for (const match of matches) {
      const queueName = getQueueName(match.queueId);
      const aggregateGameMode = aggregatedMatchesByQueueId[queueName];
      const aggregateChampionStats = this.updateChampionStats(aggregateGameMode, match);
      aggregateGameMode.totalMatches = aggregateGameMode.totalMatches ? aggregateGameMode.totalMatches + 1 : 1;
      aggregateGameMode[match.championId] = aggregateChampionStats;
    }
    // const averages: AggregateLeagueMatches = {};
    for (const queueId in aggregatedMatchesByQueueId) {
      const aggregateGameMode = aggregatedMatchesByQueueId[queueId as RIOT_QUEUE_KEYS];
      for (const key in aggregateGameMode) {
        if (key !== "totalMatches") {
          const totalMatches = aggregateGameMode[key].totalMatches;
          const championStats = aggregateGameMode[key];
          championStats.assists = Math.floor(championStats.assists / totalMatches);
          championStats.championId = Math.floor(championStats.championId / totalMatches);
          championStats.crowdControlScore = Math.floor(championStats.crowdControlScore / totalMatches);
          championStats.damageDealtToBuildings = Math.floor(championStats.damageDealtToBuildings / totalMatches);
          championStats.deaths = Math.floor(championStats.deaths / totalMatches);
          championStats.doubleKills = Math.floor(championStats.doubleKills / totalMatches);
          championStats.firstBlood = Math.floor(championStats.firstBlood / totalMatches);
          championStats.firstTowerKill = Math.floor(championStats.firstTowerKill / totalMatches);
          championStats.goldEarned = Math.floor(championStats.goldEarned / totalMatches);
          championStats.kills = Math.floor(championStats.kills / totalMatches);
          championStats.magicalDamage = Math.floor(championStats.magicalDamage / totalMatches);
          championStats.magicalDamageTaken = Math.floor(championStats.magicalDamageTaken / totalMatches);
          championStats.pentaKills = Math.floor(championStats.pentaKills / totalMatches);
          championStats.physicalDamage = Math.floor(championStats.physicalDamage / totalMatches);
          championStats.physicalDamageTaken = Math.floor(championStats.physicalDamageTaken / totalMatches);
          championStats.quadraKills = Math.floor(championStats.quadraKills / totalMatches);
          championStats.totalMatches = Math.floor(championStats.totalMatches / totalMatches);
          championStats.tripleKills = Math.floor(championStats.tripleKills / totalMatches);
          championStats.trueDamage = Math.floor(championStats.trueDamage / totalMatches);
          championStats.trueDamageTaken = Math.floor(championStats.trueDamageTaken / totalMatches);
          championStats.win = Math.floor(championStats.win / totalMatches);
        }
      }
    }
    return aggregatedMatchesByQueueId;
  }

  parseValue(value: boolean): number;
  parseValue(value: string): string;
  parseValue(value: Date): Date;
  parseValue(value: number): number;
  parseValue(value: number | boolean | string | Date) {
    const type = typeof value;
    if (type === "boolean") {
      return Number(value);
    }
    return value;
  }

  updateChampionStats(aggregatedMatchesByGameMode: QueueTypeToLeagueMatch, match: LeagueMatch): AggregateLeagueMatch {
    const aggregatedChampionStats = aggregatedMatchesByGameMode[match.championId];
    if (!aggregatedChampionStats) {
      return {
        assists: this.parseValue(match.assists),
        championId: this.parseValue(match.championId),
        crowdControlScore: this.parseValue(match.crowdControlScore),
        damageDealtToBuildings: this.parseValue(match.damageDealtToBuildings),
        deaths: this.parseValue(match.deaths),
        doubleKills: this.parseValue(match.doubleKills),
        firstBlood: this.parseValue(match.firstBlood),
        firstTowerKill: this.parseValue(match.firstTowerKill),
        gameMode: this.parseValue(match.gameMode),
        goldEarned: this.parseValue(match.goldEarned),
        kills: this.parseValue(match.kills),
        magicalDamage: this.parseValue(match.magicalDamage),
        magicalDamageTaken: this.parseValue(match.magicalDamageTaken),
        pentaKills: this.parseValue(match.pentaKills),
        physicalDamage: this.parseValue(match.physicalDamage),
        physicalDamageTaken: this.parseValue(match.physicalDamageTaken),
        quadraKills: this.parseValue(match.quadraKills),
        totalMatches: 1,
        tripleKills: this.parseValue(match.tripleKills),
        trueDamage: this.parseValue(match.trueDamage),
        trueDamageTaken: this.parseValue(match.trueDamageTaken),
        win: this.parseValue(match.win),
      };
    }
    return {
      ...aggregatedChampionStats,
      assists: aggregatedChampionStats.assists + this.parseValue(match.assists),
      crowdControlScore: aggregatedChampionStats.crowdControlScore + this.parseValue(match.crowdControlScore),
      damageDealtToBuildings: aggregatedChampionStats.damageDealtToBuildings + this.parseValue(match.damageDealtToBuildings),
      deaths: aggregatedChampionStats.deaths + this.parseValue(match.deaths),
      doubleKills: aggregatedChampionStats.doubleKills + this.parseValue(match.doubleKills),
      firstBlood: aggregatedChampionStats.firstBlood + this.parseValue(match.firstBlood),
      firstTowerKill: aggregatedChampionStats.firstTowerKill + this.parseValue(match.firstTowerKill),
      goldEarned: aggregatedChampionStats.goldEarned + this.parseValue(match.goldEarned),
      kills: aggregatedChampionStats.kills + this.parseValue(match.kills),
      magicalDamage: aggregatedChampionStats.magicalDamage + this.parseValue(match.magicalDamage),
      magicalDamageTaken: aggregatedChampionStats.magicalDamageTaken + this.parseValue(match.magicalDamageTaken),
      pentaKills: aggregatedChampionStats.pentaKills + this.parseValue(match.pentaKills),
      physicalDamage: aggregatedChampionStats.physicalDamage + this.parseValue(match.physicalDamage),
      physicalDamageTaken: aggregatedChampionStats.physicalDamageTaken + this.parseValue(match.physicalDamageTaken),
      quadraKills: aggregatedChampionStats.quadraKills + this.parseValue(match.quadraKills),
      totalMatches: aggregatedChampionStats.totalMatches + 1,
      tripleKills: aggregatedChampionStats.tripleKills + this.parseValue(match.tripleKills),
      trueDamage: aggregatedChampionStats.trueDamage + this.parseValue(match.trueDamage),
      trueDamageTaken: aggregatedChampionStats.trueDamageTaken + this.parseValue(match.trueDamageTaken),
      win: aggregatedChampionStats.win + this.parseValue(match.win),
    };
  }
}
