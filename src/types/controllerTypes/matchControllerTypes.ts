import { FastifyRequest } from 'fastify';

export type GetSummonerParams = {
  summonerName: string;
  tagLine: string;
};

export type LeagueMatchType = {
  count: number;
  queueId: string;
};

export interface GetMatchType extends FastifyRequest {
  Params: GetSummonerParams;
  Querystring: LeagueMatchType;
}
