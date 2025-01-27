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

  constructor(riotService: RiotService) {
    this.riotService = riotService;
  }

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
  };
}
