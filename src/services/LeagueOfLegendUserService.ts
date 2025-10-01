import type { RIOT_QUEUE_KEYS } from "@/constants";
import { RIOT_QUEUES } from "@/constants/riotConstants/riotQueues";
import type { RiotAccount } from "@/models/RiotAccount";
import { Summoner } from "@/models/Summoner";
import type { ISummonerRepository } from "@/repository/interfaces/ISummonerRepository";
import type { IRiotRepository } from "@/repository/riot/interfaces/IRiotRepository";
import type { ILeagueOfLegendUserService } from "./interfaces/ILeagueOfLegendUserService";

/**
 * League of legend service keeps the summoner user details up to date
 * and return aggregate stats based on user and queueId, game match type.
 *
 * Service also updates or retrieves the aggregated stats based on the user
 * and queueId, game match type.
 * */
// TODO: Needs to implement an aggregate service eventually
export class LeagueOfLegendUserService implements ILeagueOfLegendUserService {
  private _riotRepository: IRiotRepository;
  private _summonerRepository: ISummonerRepository;

  // change leagueMatchService to leagueMatchRepository
  // if possible we should have services hit repostiories
  constructor(riotRepository: IRiotRepository, summonerRepository: ISummonerRepository) {
    this._riotRepository = riotRepository;
    this._summonerRepository = summonerRepository;
  }

  /**
   * Retrieves the Summoner from the database or from the Riot API if it doesn't exist.
   * Updates the database with the Summoner if it doesn't exist or is stale, stale after 3 minutes.
   * @param summonerName - User in game name
   * @param tagLine - Additional account identifier, after the summoner name ususally starts with #
   * @returns {Summoner}
   */
  async getSummonerByNameAndTagLine(summonerName: string, tagLine: string): Promise<Summoner | null> {
    const summoner = await this._summonerRepository.findByNameAndTag(summonerName, tagLine);
    if (!summoner) {
      return null;
    }

    // const threeMins = 180000; // 3 mins in ms
    // // Return summoner if found and data is not outdated by 3 mins
    // if (dbSummoner && !hasTimeElapsed(dbSummoner.updatedAt.valueOf(), threeMins)) {
    //   return dbSummoner;
    // }

    return summoner;
  }

  /**
   * Retrieves the Summoner from the database or from the Riot API if it doesn't exist.
   * Updates the database with the Summoner if it doesn't exist or is stale, stale after 3 minutes.
   * @param puuid - Encrypted id used by Riot service
   * @returns {Summoner}
   */
  async getSummonerByPuuid(puuid: string): Promise<Summoner | null> {
    // TODO: retrieve the latest user aggregate numbers.
    const summoner = await this._summonerRepository.findByPuuid(puuid);
    if (!summoner) {
      null;
    }

    // const threeMins = 180000; // 3 mins in ms
    // Return summoner if found and data is not outdated by 3 mins
    // if (dbSummoner && !hasTimeElapsed(dbSummoner.updatedAt.valueOf(), threeMins)) {
    //   return dbSummoner;
    // }

    return summoner;
  }

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
  async updateMatchesBySummonerNameAndTagAndQueueId(summonerName: string, tagLine: string, queueId: RIOT_QUEUE_KEYS, count = 20) {
    const riotAccount: RiotAccount = await this._riotRepository.getAccountBySummonerNameTagLine(summonerName, tagLine);

    const { queueId: matchType } = RIOT_QUEUES[queueId];
    const matchIds = await this._riotRepository.getMatchIdsByPuuid(riotAccount.puuid, matchType, count);
    // todo:
    // 1. delete all matches with match service
    // 2. updates matches with this._riotRepository.getMatchesByMatchIds(matchIds);
    // 3. re aggregate that data.
    return this._riotRepository.getMatchesByMatchIds(matchIds);
  }

  /**
   * Retrieves the summoners pre-aggregate the data in the database.
   */
  async getChampionAggregateStats() {}

  /**
   * Updates the matches in the database, deletes old aggregated stats and create new ones based on
   * updated matches.
   */
  async updateSummonerAggregateStats() {}

  /**
   * Retrieves the summoner matches from the database.
   *
   * @param summonerName
   * @param tagLine
   * @param queueId
   * @param count
   * @returns
   */
  async getMatchesBySummonerNameAndTagAndQueueId(summonerName: string, tagLine: string, queueId: RIOT_QUEUE_KEYS, count = 20) {
    // todo: come back to this once match repository is created to pull from actual matches in db
  }

  async updateSummonerByPuuid(puuid: string) {
    const riotAccount = await this._riotRepository.getAccountByPuuid(puuid);

    if (!riotAccount) throw new Error(`No user could be found with puuid: ${puuid}`);

    const riotSummoner = await this._riotRepository.getSummonerByPuuid(puuid);
    const { summonerName, tagLine } = riotAccount;
    const { summonerLevel, profileIconId, revisionDate } = riotSummoner;

    const summoner = new Summoner(puuid, summonerName, tagLine, summonerLevel, profileIconId, revisionDate, new Date());

    // update db with summoner
    await this._summonerRepository.save(summoner);

    return summoner;
  }
  async updateSummonerBySummonerNameAndTagLine(summonerName: string, tagLine: string) {
    const riotAccount = await this._riotRepository.getAccountBySummonerNameTagLine(summonerName, tagLine);

    if (!riotAccount) throw new Error(`No user could be found with Summoner name: ${summonerName} and tag line: ${tagLine}`);

    const riotSummoner = await this._riotRepository.getSummonerByPuuid(riotAccount.puuid);
    const { puuid } = riotAccount;
    const { summonerLevel, profileIconId, revisionDate } = riotSummoner;

    const summoner = new Summoner(puuid, summonerName, tagLine, summonerLevel, profileIconId, revisionDate, new Date());

    // update db with summoner
    await this._summonerRepository.save(summoner);
    return summoner;
  }
}
