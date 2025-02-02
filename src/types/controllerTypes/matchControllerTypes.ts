import type { FastifyRequest } from "fastify";

/** TODO: verify if needed */
export type GetSummonerParams = {
  summonerName: string;
  tagLine: string;
};

/** TODO: verify if needed */
export type LeagueMatchType = {
  count: number;
  queueId: string;
};

/** TODO: verify if needed */
export interface GetMatchType extends FastifyRequest {
  Params: GetSummonerParams;
  Querystring: LeagueMatchType;
}
