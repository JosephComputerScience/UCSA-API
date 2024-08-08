import { ISummonerRepository } from './interfaces/ISummonerRepository';
import { RiotAccountDAO } from '../dao/RiotAccountDAO';
import { RiotSummonerDAO } from '../dao/RiotSummonerDAO';
import { Summoner } from '../models/Summoner';
import { IRiotAccountDAO } from '../dao/interfaces/IRiotAccountDAO';
import { IRiotSummonerDAO } from '../dao/interfaces/IRiotSummonerDAO';
import { ISummonerDAO } from '../dao/interfaces/ISummonerDAO';

class SummonerRepository implements ISummonerRepository {
  private _riotAccountDAO: IRiotAccountDAO;
  private _riotSummonerDAO: IRiotSummonerDAO;
  private _summonerDAO: ISummonerDAO;

  constructor(
    riotAccountDAO: IRiotAccountDAO,
    riotSummonerDAO: IRiotSummonerDAO,
    summonerDAO: ISummonerDAO
  ) {
    this._riotAccountDAO = riotAccountDAO;
    this._riotSummonerDAO = riotSummonerDAO;
    this._summonerDAO = summonerDAO;
  }
  findByNameAndTag = async (name: string, tagLine: string) => {
    try {
      const summoner = await this._summonerDAO.findByNameAndTag(name, tagLine);
      if (!summoner) {
        const riotAccount = await this._riotAccountDAO.findByNameTagLine(
          name,
          tagLine
        );
        const riotSummoner = await this._riotSummonerDAO.findByPuuid(
          riotAccount.puuid
        );
        const newSummoner = new Summoner(
          riotSummoner.puuid,
          name,
          tagLine,
          riotSummoner.accountId,
          riotSummoner.summonerId,
          riotSummoner.summonerLevel,
          riotSummoner.profileIconId,
          new Date(riotSummoner.revisionDate)
        );

        await this._summonerDAO.save(newSummoner);

        return newSummoner;
      }

      return summoner;
    } catch (e) {
      return null;
    }
  };

  findByPuuid = async (puuid: string) => {
    try {
      const summoner = await this._summonerDAO.findByPuuid(puuid);
      if (!summoner) {
        const riotAccount = await this._riotAccountDAO.findByPuuid(puuid);
        const riotSummoner = await this._riotSummonerDAO.findByPuuid(puuid);
        const newSummoner = new Summoner(
          riotSummoner.puuid,
          riotAccount.gameName,
          riotAccount.tagLine,
          riotSummoner.accountId,
          riotSummoner.summonerId,
          riotSummoner.summonerLevel,
          riotSummoner.profileIconId,
          new Date(riotSummoner.revisionDate)
        );

        await this._summonerDAO.save(newSummoner);

        return newSummoner;
      }

      return summoner;
    } catch (e) {
      return null;
    }
  };
  save = async (summoner: Summoner) => {
    await this._summonerDAO.save(summoner);
  };
  update = async (summoner: Summoner) => {
    await this._summonerDAO.update(summoner);
  };
}
