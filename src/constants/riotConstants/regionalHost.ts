import type { RIOT_REGIONAL_TYPE } from "../../types/riot";

/**
 * Riot regional host values entire list can be found at
 * https://developer.riotgames.com/docs/lol#routing-values_regional-routing-values
 * */
export const RIOT_REGIONAL_HOST = {
  AMERICAS: "https://americas.api.riotgames.com",
  ASIA: "https://asia.api.riotgames.com",
  EUROPE: "https://europe.api.riotgames.com",
  SEA: "https://sea.api.riotgames.com",
} as const;

/** Riot available region keys */
export const RIOT_REGIONAL = {
  AMERICAS: "AMERICAS",
  ASIA: "ASIA",
  EUROPE: "EUROPE",
  SEA: "SEA",
} as const;

/**
 * Returns the riot regional host url based on global env RIOT_REGIONAL
 * else default to https://americas.api.riotgames.com
 */
export const RIOT_REGIONAL_HOST_URL =
  (process.env.RIOT_REGIONAL ?? RIOT_REGIONAL.AMERICAS) in RIOT_REGIONAL_HOST
    ? RIOT_REGIONAL_HOST[process.env.RIOT_REGIONAL as RIOT_REGIONAL_TYPE]
    : RIOT_REGIONAL_HOST.AMERICAS;
