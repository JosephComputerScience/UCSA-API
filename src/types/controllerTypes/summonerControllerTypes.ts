import { FastifyRequest } from 'fastify';

export type GetSummonerParams = {
  summonerName: string;
  tagLine: string;
};

export interface GetSummonerType extends FastifyRequest {
  Params: GetSummonerParams;
}
