<<<<<<<< HEAD:src/services/legacy.matchService.ts
import { RIOT_QUEUE_IDS } from '../constants';
import { RIOT_QUEUES } from '../constants/riotConstants/riotQueues';
import { RiotAccount } from '../models/RiotAccount';
import { RiotService } from './riotService';
/**
 * Deprecated this should now be the leagueOfLegendService
 * which implements the league of legend strategy and needs
 * to be moved to the strategy folder, we will no longer update
 * matches on it's own. This is to help with api keys that throttle.
 * For example riot api only allows like 5-10 requests a second. Which
 * is very little.
 * */
/**
 * this service should retrieve just the latest
 * matches and should verify if the latest match
 * is already in the db to avoid reaggregating data
 **/
export class LeagueOfLegendService {
  riotService: RiotService;
========
import { MATCH_STRATEGIES } from '../constants/matchStrategies';
import { MatchStrategyFactory } from '../factory/match/matchStrategyFactory';

/**
 * Updates the users latest match history from the respective
 * game api to the database.
 *
 * Retrieves the users match history in the database.
 *
 * Uses the strategy pattern to encapsulate behavior to be able
 * to pull matches from the database or update the database from
 * each games respective third party api.
 *
 */
export class MatchService {
  private _matchStrategyFactory: MatchStrategyFactory;
>>>>>>>> master:src/services/matchService.ts

  constructor(matchStrategyFactory: MatchStrategyFactory) {
    this._matchStrategyFactory = matchStrategyFactory;
  }

<<<<<<<< HEAD:src/services/legacy.matchService.ts
  getMatchesByGameByNameAndTag = async (
    summonerName: string,
    tagLine: string,
    queueId: keyof typeof RIOT_QUEUE_IDS,
    count = 20
  ) => {
    const riotAccount: RiotAccount = await this.riotService.getAccountByNameTagLine(
      summonerName,
      tagLine
    );

    const { queueId: matchType } = RIOT_QUEUES[queueId];
    const matchIds = await this.riotService.getMatchIdsByPuuid(riotAccount.puuid, matchType, count);
    return this.riotService.getMatchesByMatchIds(matchIds);
  };

  updateMatchesByGameByNameAndTag = async (
    summonerName: string,
    tagLine: string,
    queueId: keyof typeof RIOT_QUEUE_IDS,
    count = 20
  ) => {
    const riotAccount: RiotAccount = await this.riotService.getAccountByNameTagLine(
      summonerName,
      tagLine
    );

    const { queueId: matchType } = RIOT_QUEUES[queueId];
    const matchIds = await this.riotService.getMatchIdsByPuuid(riotAccount.puuid, matchType, count);
    return this.riotService.getMatchesByMatchIds(matchIds);
========
  getMatches = (id: string, gameType: keyof typeof MATCH_STRATEGIES) => {
    const strategy = this._matchStrategyFactory.getMatchStrategy(gameType);
    return strategy.getMatchesByUserId(id);
  };

  updateMatches = (id: string, gameType: keyof typeof MATCH_STRATEGIES) => {
    const strategy = this._matchStrategyFactory.getMatchStrategy(gameType);
    strategy.updateMatchesByUserId(id);
>>>>>>>> master:src/services/matchService.ts
  };
}
