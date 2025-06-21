import type { RouteGenericInterface } from "fastify";
import type { SummonerDTO } from "@/dto/SummonerDTO";

export type GetSummonerParams = {
  summonerName: string;
  tagLine: string;
  puuid: string;
};

export interface GetSummonerType extends RouteGenericInterface {
  Querystring: GetSummonerParams;
}

export type ReplySummoner = {
  summoner: SummonerDTO;
};
export interface ReplySummonerType extends RouteGenericInterface {
  Reply: ReplySummoner;
}
