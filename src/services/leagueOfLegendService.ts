import type { RIOT_QUEUE_IDS } from "../constants";
import { RIOT_QUEUES } from "../constants/riotConstants/riotQueues";
import type { RiotAccount } from "../models/RiotAccount";
import { Summoner } from "../models/Summoner";
import type { ISummonerRepository } from "../repository/interfaces/ISummonerRepository";
import { hasTimeElapsed } from "../utils/hasTimeElapsed";
import type { ILeagueOfLegendService } from "./interfaces/ILeagueOfLegendService";
import type { RiotService } from "./riotService";
/**
 * League of legend service keeps the summoner user details up to date
 * and return aggregate stats based on user and queueId, game match type.
 *
 * Service also updates or retrieves the aggregated stats based on the user
 * and queueId, game match type.
 * */
export class LeagueOfLegendService implements ILeagueOfLegendService {
  private _riotService: RiotService;
  private _summonerRepository: ISummonerRepository;

  constructor(riotService: RiotService, summonerRepository: ISummonerRepository) {
    this._riotService = riotService;
    this._summonerRepository = summonerRepository;
  }

  /**
   * Retrieves the Summoner from the database or from the Riot API if it doesn't exist.
   * Updates the database with the Summoner if it doesn't exist or is stale, stale after 3 minutes.
   * @param summonerName - User in game name
   * @param tagLine - Additional account identifier, after the summoner name ususally starts with #
   * @returns {Summoner}
   */
  getSummonerByNameAndTagline = async (summonerName: string, tagLine: string): Promise<Summoner> => {
    // TODO: retrieve the latest user aggregate numbers.
    try {
      const dbSummoner = await this._summonerRepository.findByNameAndTag(summonerName, tagLine);

      const threeMins = 180000; // 3 mins in ms
      // Return summoner if found and data is not outdated by 3 mins
      if (dbSummoner && !hasTimeElapsed(dbSummoner.lastManualUpdatedAt.valueOf(), threeMins)) {
        return dbSummoner;
      }

      const riotAccount = await this._riotService.getAccountByNameTagLine(summonerName, tagLine);

      if (!riotAccount) throw new Error(`No user could be found with Summoner name: ${summonerName} and tag line: ${tagLine}`);

      const riotSummoner = await this._riotService.getSummonerByPuuid(riotAccount.puuid);
      const { puuid } = riotAccount;
      const { accountId, summonerId, summonerLevel, profileIconId, revisionDate } = riotSummoner;

      const summoner = new Summoner(
        puuid,
        summonerName,
        tagLine,
        accountId,
        summonerId,
        summonerLevel,
        profileIconId,
        revisionDate,
        revisionDate,
      );

      // update db with summoner
      this._summonerRepository.save(summoner);

      return summoner;
    } catch {
      throw new Error(`No user could be found with Summoner name: ${summonerName} and tag line: ${tagLine}`);
    }
  };

  /**
   * Deletes the summoners matches in the database and updates the summoners latest matches.
   * This keeps the api simple for now so that we don't need to worry about match overlaps
   * or catching up to the last update.
   *
   * @param summonerName - User in game name
   * @param tagLine - Additional account identifier, after the summoner name ususally starts with #
   * @param queueId - Determines the game match type
   * @param count - Dumber of matches to update, default is 20
   * @returns
   */
  updateMatchesBySummonerNameAndTagAndQueueId = async (
    summonerName: string,
    tagLine: string,
    queueId: keyof typeof RIOT_QUEUE_IDS,
    count = 20,
  ) => {
    const riotAccount: RiotAccount = await this._riotService.getAccountByNameTagLine(summonerName, tagLine);

    const { queueId: matchType } = RIOT_QUEUES[queueId];
    const matchIds = await this._riotService.getMatchIdsByPuuid(riotAccount.puuid, matchType, count);
    // todo:
    // 1. delete all matches with match service
    // 2. updates matches with this._riotService.getMatchesByMatchIds(matchIds);
    // 3. re aggregate that data.
    return this._riotService.getMatchesByMatchIds(matchIds);
  };

  /**
   * Retrieves the summoners pre-aggregate the data in the database.
   */
  getChampionAggregateStats = () => {};

  /**
   * Updates the matches in the database, deletes old aggregated stats and create new ones based on
   * updated matches.
   */
  updateSummonerAggregateStats = () => {};

  /**
   * Retrieves the summoner matches from the database.
   *
   * @param summonerName
   * @param tagLine
   * @param queueId
   * @param count
   * @returns
   */
  getMatchesBySummonerNameAndTagAndQueueId = async (
    summonerName: string,
    tagLine: string,
    queueId: keyof typeof RIOT_QUEUE_IDS,
    count = 20,
  ) => {
    // todo: come back to this once match service is created
  };
}
