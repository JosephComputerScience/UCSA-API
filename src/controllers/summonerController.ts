import { type FastifyReply, FastifyRequest } from "fastify";
import { SummonerDTO } from "../dto/SummonerDTO";
import type { ISummonerService } from "../services/interfaces/ISummonerService";
import type { UCSARequest } from "../types";
import type { GetSummonerType } from "../types/controllerTypes/summonerControllerTypes";

export class SummonerController {
  private _summonerService: ISummonerService;

  constructor(summonerService: ISummonerService) {
    this._summonerService = summonerService;
  }

  getSummonerByNameAndTag = async (req: UCSARequest<GetSummonerType>, reply: FastifyReply): Promise<SummonerDTO | undefined> => {
    const { summonerName, tagLine } = req.params;
    const summoner = await this._summonerService.getSummonerByNameAndTagline(summonerName, tagLine);

    if (!summoner) return undefined;

    const { puuid, accountId, summonerId, summonerLevel, profileIconId, updatedAt } = summoner;

    return new SummonerDTO(puuid, summonerName, tagLine, accountId, summonerId, summonerLevel, profileIconId, updatedAt);
  };
}
