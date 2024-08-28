import { FastifyReply, FastifyRequest } from 'fastify';
import { ISummonerService } from '../services/interfaces/ISummonerService';
import { UCSARequest } from '../types';
import { GetSummonerType } from '../types/summonerControllerTypes';
import { SummonerDTO } from '../dto/SummonerDTO';

export class SummonerController {
  private _summonerService: ISummonerService;

  constructor(summonerService: ISummonerService) {
    this._summonerService = summonerService;
  }
  
  getSummonerByNameAndTag = async (
    req: UCSARequest<GetSummonerType>,
    reply: FastifyReply
  ): Promise<SummonerDTO | undefined> => {
    const { summonerName, tagLine } = req.params;
    const summoner = await this._summonerService.getSummoner(
      summonerName,
      tagLine
    );

    if (!summoner) return undefined;

    const {
      puuid,
      accountId,
      summonerId,
      summonerLevel,
      profileIconId,
      updatedAt,
    } = summoner;

    return new SummonerDTO(
      puuid,
      summonerName,
      tagLine,
      accountId,
      summonerId,
      summonerLevel,
      profileIconId,
      updatedAt
    );
  };
  getSummonerByPuuid = async () => {};
}
