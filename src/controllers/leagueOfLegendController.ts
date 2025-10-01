import type { ILolUserMatch } from "@/orchestrator/interfaces/ILolUserMatch";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { ILeagueOfLegendController } from "./interfaces/ILeagueOfLegendController";
import type { GetSummonerType } from "./types/leagueSummonerControllerTypes";

export class LeagueOfLegendController implements ILeagueOfLegendController {
  private _lolUserMatchOrchestrator: ILolUserMatch;

  constructor(lolUserMatchOrchestrator: ILolUserMatch) {
    this._lolUserMatchOrchestrator = lolUserMatchOrchestrator;
  }

  async getSummoner(req: FastifyRequest<GetSummonerType>, reply: FastifyReply) {
    const { puuid, summonerName, tagLine } = req.query;
    const summoner = puuid
      ? await this._lolUserMatchOrchestrator.getSummonerByPuuid(puuid)
      : await this._lolUserMatchOrchestrator.getSummonerByNameAndTagLine(summonerName, tagLine);

    return reply.send({ summoner });
  }
}
