// deprecate summoner go with league
import type { FastifyReply, FastifyRequest } from "fastify";
import { leagueOfLegendService } from "../config/container";
import type { SummonerDTO } from "../dto/SummonerDTO";
import type { ILeagueOfLegendService } from "../services/interfaces/ILeagueOfLegendService";
// import type { ISummonerService } from "../services/interfaces/ILeagueOfLegendService";
import type { UCSAReply, UCSARequest } from "../types";
import type { ILeagueOfLegendController } from "./interfaces/ILeagueOfLegendController";
import type { GetSummonerType, ReplySummonerType } from "./types/leagueSummonerControllerTypes";

export class LeagueOfLegendController implements ILeagueOfLegendController {
  private _leagueOfLegendService: ILeagueOfLegendService;

  constructor(leagueOfLegendService: ILeagueOfLegendService) {
    this._leagueOfLegendService = leagueOfLegendService;
  }

  async getSummoner(req: FastifyRequest<GetSummonerType>, reply: FastifyReply) {
    const { puuid, summonerName, tagLine } = req.query;
    const summoner = puuid
      ? await this._leagueOfLegendService.getSummonerByPuuid(puuid)
      : await this._leagueOfLegendService.getSummonerByNameAndTagline(summonerName, tagLine);

    if (!summoner) return undefined;

    const {
      puuid: summonerPuuid,
      accountId,
      summonerId,
      summonerLevel,
      summonerName: name,
      profileIconId,
      tagLine: tag,
      updatedAt,
    } = summoner;

    const summonerDTO: SummonerDTO = {
      puuid: summonerPuuid,
      summonerName: name,
      tagLine: tag,
      accountId,
      summonerId,
      summonerLevel,
      profileIconId,
      updatedAt,
    };

    return reply.send({ summoner: summonerDTO });
  }
}
