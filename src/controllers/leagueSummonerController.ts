// deprecate summoner go with league
import type { FastifyReply, FastifyRequest } from "fastify";
import { leagueOfLegendService } from "../config/container";
import type { SummonerDTO } from "../dto/SummonerDTO";
import type { ILeagueOfLegendService } from "../services/interfaces/ILeagueOfLegendService";
// import type { ISummonerService } from "../services/interfaces/ILeagueOfLegendService";
import type { UCSAReply, UCSARequest } from "../types";
import type { ILeagueSummonerController } from "./interfaces/ILeagueSummonerController";
import type { GetSummonerType, ReplySummonerType } from "./types/leagueSummonerControllerTypes";

export class LeagueSummonerController implements ILeagueSummonerController {
  private _leagueOfLegendService: ILeagueOfLegendService;

  constructor(leagueOfLegendService: ILeagueOfLegendService) {
    this._leagueOfLegendService = leagueOfLegendService;
  }

  getSummonerByNameAndTag = async (req: FastifyRequest<GetSummonerType>, reply: FastifyReply) => {
    const { summonerName, tagLine } = req.query;
    const summoner = await this._leagueOfLegendService.getSummonerByNameAndTagline(summonerName, tagLine);

    if (!summoner) return undefined;

    const { puuid, accountId, summonerId, summonerLevel, profileIconId, updatedAt } = summoner;

    const summonerDTO: SummonerDTO = { puuid, summonerName, tagLine, accountId, summonerId, summonerLevel, profileIconId, updatedAt };
    return reply.send({ summoner: summonerDTO });
  };
  async test(req: FastifyRequest<GetSummonerType>, reply: FastifyReply) {
    const { summonerName, tagLine } = req.query;
    const t = await leagueOfLegendService.getSummonerByNameAndTagline("RubMyTummy", "NA1");
    return reply.send({ t });
  }
}
