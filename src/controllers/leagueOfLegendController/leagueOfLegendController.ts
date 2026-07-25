import type { ILolUserMatch } from "@/orchestrator/lolUserMatch/interfaces/ILolUserMatch";
import type { ILeagueOfLegendMatchService } from "@/services/leagueOfLegendMatch/interfaces/ILeagueOfLegendMatchService";
import type { IMatchAggreGateService } from "@/services/matchAggregateService/interfaces/IMatchAggregateService";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { ILeagueOfLegendController } from "./interfaces/ILeagueOfLegendController";
import type { GetMatchType, GetSummonerType } from "./types/leagueSummonerControllerTypes";

export class LeagueOfLegendController implements ILeagueOfLegendController {
  private _lolUserMatchOrchestrator: ILolUserMatch;
  private _lolMatchService: ILeagueOfLegendMatchService;
  private _matchAggregateService: IMatchAggreGateService;

  constructor(
    lolUserMatchOrchestrator: ILolUserMatch,
    lolMatchService: ILeagueOfLegendMatchService,
    matchAggregateService: IMatchAggreGateService,
  ) {
    this._lolUserMatchOrchestrator = lolUserMatchOrchestrator;
    this._lolMatchService = lolMatchService;
    this._matchAggregateService = matchAggregateService;
  }

  async getSummoner(req: FastifyRequest<GetSummonerType>, reply: FastifyReply) {
    const { puuid, summonerName, tagLine } = req.query;
    const summoner = puuid
      ? await this._lolUserMatchOrchestrator.getSummonerByPuuid(puuid)
      : await this._lolUserMatchOrchestrator.getSummonerByNameAndTagLine(summonerName, tagLine);

    return reply.send({ summoner });
  }

  async getMatches(req: FastifyRequest<GetMatchType>, reply: FastifyReply) {
    const { puuid } = req.query;
    const matches = await this._lolMatchService.getMatchesByPuuid(puuid);

    return reply.send({ matches });
  }

  async getAggregateMatches(req: FastifyRequest<GetMatchType>, reply: FastifyReply) {
    const { puuid } = req.query;
    const matches = await this._lolMatchService.getMatchesByPuuid(puuid);
    const aggregateMatches = this._matchAggregateService.aggregateMatches(matches);

    return reply.send({ aggregateMatches });
  }
}
