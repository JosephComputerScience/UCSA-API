import type { ISummonerDAO } from "@/dao/interfaces/ISummonerDAO";
import { Summoner } from "@/models/Summoner";
import type { ISummonerRepository } from "./interfaces/ISummonerRepository";

export class SummonerRepository implements ISummonerRepository {
  private _summonerDAO: ISummonerDAO;

  constructor(summonerDAO: ISummonerDAO) {
    this._summonerDAO = summonerDAO;
  }

  findByNameAndTag = async (summonerName: string, tagLine: string) => {
    try {
      const entity = await this._summonerDAO.findByNameAndTag(summonerName, tagLine);
      if (!entity) return null;
      const { accountId, profileIconId, puuid, revisionDate, summonerId, summonerLevel, updatedAt } = entity;

      const summoner = new Summoner(
        puuid,
        summonerName,
        tagLine,
        accountId,
        summonerId,
        summonerLevel,
        profileIconId,
        revisionDate,
        updatedAt,
      );

      return summoner;
    } catch (e) {
      return null;
    }
  };

  findByPuuid = async (puuid: string) => {
    try {
      const entity = await this._summonerDAO.findByPuuid(puuid);
      if (!entity) return null;
      const { accountId, profileIconId, revisionDate, summonerId, summonerLevel, summonerName, tagLine, updatedAt } = entity;

      const summoner = new Summoner(
        puuid,
        summonerName,
        tagLine,
        accountId,
        summonerId,
        summonerLevel,
        profileIconId,
        revisionDate,
        updatedAt,
      );

      return summoner;
    } catch (e) {
      return null;
    }
  };

  save = async (summoner: Summoner) => {
    await this._summonerDAO.upsert(summoner);
  };
}
