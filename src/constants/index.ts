import { getRiotApiKey } from '../utils/getRiotApiKey';
import { getRiotPlatformHost } from '../utils/getRiotPlatformHost';
import { getRiotRegionalHost } from '../utils/getRiotRegionalHost';

/** Riot platform host urls  */
export enum PLATFORM_HOST {
  BR1 = 'br1.api.riotgames.com',
  EUN1 = 'eun1.api.riotgames.com',
  EUW1 = 'euw1.api.riotgames.com',
  JP1 = 'jp1.api.riotgames.com',
  KR = 'kr.api.riotgames.com',
  LA1 = 'la1.api.riotgames.com',
  LA2 = 'la2.api.riotgames.com',
  NA1 = 'na1.api.riotgames.com',
  OC1 = 'oc1.api.riotgames.com',
  TR1 = 'tr1.api.riotgames.com',
  RU = 'ru.api.riotgames.com',
  PH2 = 'ph2.api.riotgames.com',
  SG2 = 'sg2.api.riotgames.com',
  TH2 = 'th2.api.riotgames.com',
  TW2 = 'tw2.api.riotgames.com',
  VN2 = 'vn2.api.riotgames.com',
}

/** Riot platform types */
export enum PLATFORM {
  BR1 = 'BR1',
  EUN1 = 'EUN1',
  EUW1 = 'EUW1',
  JP1 = 'JP1',
  KR = 'KR',
  LA1 = 'LA1',
  LA2 = 'LA2',
  NA1 = 'NA1',
  OC1 = 'OC1',
  TR1 = 'TR1',
  RU = 'RU',
  PH2 = 'PH2',
  SG2 = 'SG2',
  TH2 = 'TH2',
  TW2 = 'TW2',
  VN2 = 'VN2',
}

/** UCSA current platform url based on env */
export const PLATFORM_HOST_URL = getRiotPlatformHost(
  process.env.PLATFORM ?? PLATFORM.NA1
);

/** Riot regional host urls */
export enum REGIONAL_HOST {
  AMERICAS = 'https://americas.api.riotgames.com',
  ASIA = 'https://asia.api.riotgames.com',
  EUROPE = 'https://europe.api.riotgames.com',
  SEA = 'https://sea.api.riotgames.com',
}

/** Riot available region types */
export enum REGIONAL {
  AMERICAS = 'AMERICAS',
  ASIA = 'ASIA',
  EUROPE = 'EUROPE',
  SEA = 'SEA',
}

/** UCSA current region url based on env */
export const REGIONAL_HOST_URL = getRiotRegionalHost(
  process.env.REGIONS ?? REGIONAL.AMERICAS
);

/** Riot api key based on env */
export const RIOT_API_KEY = getRiotApiKey();

/** Export module as well */
const module = {
  PLATFORM_HOST_URL,
  REGIONAL,
  REGIONAL_HOST,
  REGIONAL_HOST_URL,
  RIOT_API_KEY,
};

export default module;
