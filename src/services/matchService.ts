import { RIOT_QUEUE_IDS } from '../constants';
import { RIOT_QUEUES } from '../constants/riotConstants/riotQueues';
import { RiotAccount } from '../models/RiotAccount';
import { RiotService } from './riotService';

/**
 * this service should retrieve just the latest
 * matches and should verify if the latest match
 * is already in the db to avoid reaggregating data
 **/
export class MatchService {
  riotService: RiotService;

  constructor(riotService: RiotService) {
    this.riotService = riotService;
  }

  getMatchesByGameByNameAndTag = async (
    summonerName: string,
    tagLine: string,
    queueId: RIOT_QUEUE_IDS,
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
    queueId: RIOT_QUEUE_IDS,
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
