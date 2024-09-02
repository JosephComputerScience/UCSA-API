import { Summoner } from '../models/Summoner';
import { ISummonerRepository } from '../repository/interfaces/ISummonerRepository';
import { hasTimeElapsed } from '../utils/hasTimeElapsed';
import { IRiotAccountService } from './interfaces/IRiotAccountService';
import { IRiotSummonerService } from './interfaces/IRiotSummonterService';
import { ISummonerService } from './interfaces/ISummonerService';

/**
 * UCSA Summoner service retrieves Summoner data from the database
 * and updates the summoner data from the Riot API if needed.
 */
export class SummonerService implements ISummonerService {
  private _summonerRepository: ISummonerRepository;
  private _riotAccountService: IRiotAccountService;
  private _riotSummonerService: IRiotSummonerService;
  // TODO: add IAggregatorRepository
  constructor(
    summonerRepository: ISummonerRepository,
    riotAccountService: IRiotAccountService,
    riotSummonerService: IRiotSummonerService
  ) {
    this._summonerRepository = summonerRepository;
    this._riotAccountService = riotAccountService;
    this._riotSummonerService = riotSummonerService;
  }

  /**
   * Retrieves the Summoner from the database or from the Riot API if it
   * doesn't exist. Updates the database with the Summoner if it doesn't exist
   * or is stale, stale after 3 minutes.
   * @param summonerName
   * @param tagLine
   * @returns {Summoner}
   */
  getSummoner = async (
    summonerName: string,
    tagLine: string
  ): Promise<Summoner> => {
    // TODO: retrieve the latest user aggregate numbers.
    // TODO: if not found in db retrieve from riot
    try {
      let dbSummoner = await this._summonerRepository.findByNameAndTag(
        summonerName,
        tagLine
      );

      const threeMins = 180000; // 3 mins in ms
      // Return summoner if found and data is not outdated by 3 mins
      if (
        dbSummoner &&
        !hasTimeElapsed(dbSummoner.updatedAt.valueOf(), threeMins)
      ) {
        return dbSummoner;
      }

      const riotAccount = await this._riotAccountService.findByNameTagLine(
        summonerName,
        tagLine
      );

      if (!riotAccount)
        throw new Error(
          `No user could be found with Summoner name: ${summonerName} and tag line: ${tagLine}`
        );

      const riotSummoner = await this._riotSummonerService.findByPuuid(
        riotAccount.puuid
      );
      const { puuid } = riotAccount;
      const {
        accountId,
        summonerId,
        summonerLevel,
        profileIconId,
        revisionDate,
      } = riotSummoner;

      const riotAPISummoner = new Summoner(
        puuid,
        summonerName,
        tagLine,
        accountId,
        summonerId,
        summonerLevel,
        profileIconId,
        revisionDate,
        revisionDate
      );

      // upsert if no summoner found in the db
      // OR if the Riot API Summoner has been revisied/updated
      // OR if summoner name and tag line belongs to a new user
      if (
        !dbSummoner ||
        (dbSummoner.puuid === riotAPISummoner.puuid &&
          dbSummoner.revisionDate !== riotAPISummoner.revisionDate) ||
        dbSummoner.puuid !== riotAPISummoner.puuid
      ) {
        this._summonerRepository.upsert(riotAPISummoner);
      }

      return riotAPISummoner;
    } catch {
      throw new Error(
        `No user could be found with Summoner name: ${summonerName} and tag line: ${tagLine}`
      );
    }
  };
}
