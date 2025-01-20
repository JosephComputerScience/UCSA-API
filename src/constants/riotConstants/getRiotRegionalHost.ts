import { REGIONAL, REGIONAL_HOST } from '../index';

export const getRiotRegionalHost = (region: string) => {
  switch (region) {
    case REGIONAL.AMERICAS:
      return REGIONAL_HOST.AMERICAS;
    case REGIONAL.ASIA:
      return REGIONAL_HOST.ASIA;
    case REGIONAL.EUROPE:
      return REGIONAL_HOST.EUROPE;
    case REGIONAL.SEA:
      return REGIONAL_HOST.SEA;
    default:
      return REGIONAL_HOST.AMERICAS;
  }
};
