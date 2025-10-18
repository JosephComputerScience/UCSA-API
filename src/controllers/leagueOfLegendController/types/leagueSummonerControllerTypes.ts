import type { SummonerDTO } from "@/dto/SummonerDTO";
import type { RouteGenericInterface } from "fastify";

export type GetSummonerParams = {
  summonerName: string;
  tagLine: string;
  puuid: string;
};

export type GetMatchesParams = {
  puuid: string;
};

export interface GetSummonerType extends RouteGenericInterface {
  Querystring: GetSummonerParams;
}

export interface GetMatchType extends RouteGenericInterface {
  Querystring: GetMatchesParams;
}


export type ReplySummoner = {
  summoner: SummonerDTO;
};
export interface ReplySummonerType extends RouteGenericInterface {
  Reply: ReplySummoner;
}
