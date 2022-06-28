/**
 * Describes the env keys that must exist
 * for the server to run properly.
 */
export enum MANDATORY_ENV_KEYS {
  API_KEY = 'API_KEY',
}

/**
 * Platform routing values
 */
export enum PLATFORMS {
  BR1 = 'br1',
  EUN1 = 'eun1',
  EUW1 = 'euw1',
  JP1 = 'jp1',
  KR = 'kr',
  LA1 = 'la1',
  LA2 = 'la2',
  NA1 = 'na1',
  OC1 = 'oc1',
  TR1 = 'tr1',
  RU = 'ru',
}

/**
 * Regional routing values
 */
export enum REGIONS {
  AMERICA = 'americas',
  ASIA = 'asia',
  EUROPE = 'europe',
}

/**
 * Riot root url endpoint
 */
export const RIOT_ROOT_URL = 'api.riotgames.com';

/**
 * Summoner v4 api tag
 */
export const SUMMONER_VERSION_4 = 'v4';

/**
 * Root summoner api endpoint
 */
export const SUMMONER_ENDPOINT = 'lol/summoner';
