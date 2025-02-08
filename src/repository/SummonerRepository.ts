import type { ISummonerDAO } from "../dao/interfaces/ISummonerDAO";
import { Summoner } from "../models/Summoner";
import type { ISummonerRepository } from "./interfaces/ISummonerRepository";

export class SummonerRepository implements ISummonerRepository {
  private _summonerDAO: ISummonerDAO;

  constructor(summonerDAO: ISummonerDAO) {
    this._summonerDAO = summonerDAO;
  }

  findByNameAndTag = async (summonerName: string, tagLine: string) => {
    try {
      const record = await this._summonerDAO.findByNameAndTag(summonerName, tagLine);
      if (!record) return null;
      const { puuid, accountId, summonerId, metadata: metadataJson, updatedAt, lastManualUpdatedAt } = record;
      const metadata = JSON.parse(metadataJson);

      const summoner = new Summoner(
        puuid,
        accountId,
        summonerId,
        summonerName,
        tagLine,
        metadata.summonerLevel,
        metadata.profileIconId,
        updatedAt,
        lastManualUpdatedAt,
      );

      return summoner;
    } catch (e) {
      return null;
    }
  };

  findByPuuid = async (puuid: string) => {
    try {
      const record = await this._summonerDAO.findByPuuid(puuid);
      if (!record) return null;
      const { accountId, summonerId, summonerName, tagLine, metadata: metadataJson, updatedAt, lastManualUpdatedAt } = record;
      const metadata = JSON.parse(metadataJson);

      const summoner = new Summoner(
        puuid,
        accountId,
        summonerId,
        summonerName,
        tagLine,
        metadata.summonerLevel,
        metadata.profileIconId,
        updatedAt,
        lastManualUpdatedAt,
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
