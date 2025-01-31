import { getRiotApiKey } from '../utils/riot/getRiotApiKey';
import { getRiotPlatformHost, getRiotRegionalHost, RIOT_QUEUES } from './riotConstants';
import { MATCH_AGGREGATE_STRATEGIES } from './matchAggregateStrategies';

/** Riot platform host urls  */
export enum PLATFORM_HOST {
  BR1 = 'https://br1.api.riotgames.com',
  EUN1 = 'https://eun1.api.riotgames.com',
  EUW1 = 'https://euw1.api.riotgames.com',
  JP1 = 'https://jp1.api.riotgames.com',
  KR = 'https://kr.api.riotgames.com',
  LA1 = 'https://la1.api.riotgames.com',
  LA2 = 'https://la2.api.riotgames.com',
  NA1 = 'https://na1.api.riotgames.com',
  OC1 = 'https://oc1.api.riotgames.com',
  TR1 = 'https://tr1.api.riotgames.com',
  RU = 'https://ru.api.riotgames.com',
  PH2 = 'https://ph2.api.riotgames.com',
  SG2 = 'https://sg2.api.riotgames.com',
  TH2 = 'https://th2.api.riotgames.com',
  TW2 = 'https://tw2.api.riotgames.com',
  VN2 = 'https://vn2.api.riotgames.com',
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
export const PLATFORM_HOST_URL = getRiotPlatformHost(process.env.PLATFORM ?? PLATFORM.NA1);

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
export const REGIONAL_HOST_URL = getRiotRegionalHost(process.env.REGIONS ?? REGIONAL.AMERICAS);

/** Riot api key based on env */
export const RIOT_API_KEY = getRiotApiKey();

export enum RIOT_QUEUE_IDS {
  ARAM = 'ARAM',
  NORMAL_BLIND = 'NORMAL_BLIND',
  NORMAL_DRAFT = 'NORMAL_DRAFT',
  RANKED_FLEX = 'RANKED_FLEX',
  RANKED_SOLO = 'RANKED_SOLO',
}

/** Export module as well */
const constants = {
  MATCH_AGGREGATE_STRATEGIES,
  PLATFORM_HOST_URL,
  REGIONAL,
  REGIONAL_HOST,
  REGIONAL_HOST_URL,
  RIOT_API_KEY,
  RIOT_QUEUES,
  RIOT_QUEUE_IDS,
};

export default constants;
