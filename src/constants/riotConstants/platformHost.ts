import type { RIOT_PLATFORM_TYPE } from "../../types/riot";

/**
 * Riot platform host urls entire list can be found at
 * https://developer.riotgames.com/docs/lol#routing-values_platform-routing-values
 * */
export const RIOT_PLATFORM_HOST = {
  BR1: "https://br1.api.riotgames.com",
  EUN1: "https://eun1.api.riotgames.com",
  EUW1: "https://euw1.api.riotgames.com",
  JP1: "https://jp1.api.riotgames.com",
  KR: "https://kr.api.riotgames.com",
  LA1: "https://la1.api.riotgames.com",
  LA2: "https://la2.api.riotgames.com",
  NA1: "https://na1.api.riotgames.com",
  OC1: "https://oc1.api.riotgames.com",
  TR1: "https://tr1.api.riotgames.com",
  RU: "https://ru.api.riotgames.com",
  PH2: "https://ph2.api.riotgames.com",
  SG2: "https://sg2.api.riotgames.com",
  TH2: "https://th2.api.riotgames.com",
  TW2: "https://tw2.api.riotgames.com",
  VN2: "https://vn2.api.riotgames.com",
} as const;

/** Riot available platform keys */
export const RIOT_PLATFORM = {
  BR1: "BR1",
  EUN1: "EUN1",
  EUW1: "EUW1",
  JP1: "JP1",
  KR: "KR",
  LA1: "LA1",
  LA2: "LA2",
  NA1: "NA1",
  OC1: "OC1",
  TR1: "TR1",
  RU: "RU",
  PH2: "PH2",
  SG2: "SG2",
  TH2: "TH2",
  TW2: "TW2",
  VN2: "VN2",
} as const;

/**
 * Returns the riot platform host url based on global env RIOT_PLATFORM
 * else default to https://na1.api.riotgames.com
 * */
export const RIOT_PLATFORM_HOST_URL =
  (process.env.RIOT_PLATFORM ?? "") in RIOT_PLATFORM_HOST
    ? RIOT_PLATFORM_HOST[process.env.RIOT_PLATFORM_HOST as RIOT_PLATFORM_TYPE]
    : RIOT_PLATFORM_HOST.NA1;
