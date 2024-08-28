import { ISummonerRepository } from './interfaces/ISummonerRepository';
import { Summoner } from '../models/Summoner';
import { ISummonerDAO } from '../dao/interfaces/ISummonerDAO';

export class SummonerRepository implements ISummonerRepository {
  private _summonerDAO: ISummonerDAO;

  constructor(summonerDAO: ISummonerDAO) {
    this._summonerDAO = summonerDAO;
  }

  findByNameAndTag = async (name: string, tagLine: string) => {
    try {
      return await this._summonerDAO.findByNameAndTag(name, tagLine);
    } catch (e) {
      return null;
    }
  };

  findByPuuid = async (puuid: string) => {
    try {
      return await this._summonerDAO.findByPuuid(puuid);
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

  upsert = async (summoner: Summoner) => {
    await this._summonerDAO.upsert(summoner);
  };
}
