import { PLATFORM, PLATFORM_HOST } from '../constants';

export const getRiotPlatformHost = (platform: string) => {
  switch (platform) {
    case PLATFORM.BR1:
      return PLATFORM_HOST.BR1;
    case PLATFORM.EUN1:
      return PLATFORM_HOST.EUN1;
    case PLATFORM.EUW1:
      return PLATFORM_HOST.EUW1;
    case PLATFORM.JP1:
      return PLATFORM_HOST.JP1;
    case PLATFORM.KR:
      return PLATFORM_HOST.KR;
    case PLATFORM.LA1:
      return PLATFORM_HOST.LA1;
    case PLATFORM.LA2:
      return PLATFORM_HOST.LA2;
    case PLATFORM.NA1:
      return PLATFORM_HOST.NA1;
    case PLATFORM.OC1:
      return PLATFORM_HOST.OC1;
    case PLATFORM.TR1:
      return PLATFORM_HOST.TR1;
    case PLATFORM.RU:
      return PLATFORM_HOST.RU;
    case PLATFORM.PH2:
      return PLATFORM_HOST.PH2;
    case PLATFORM.SG2:
      return PLATFORM_HOST.SG2;
    case PLATFORM.TH2:
      return PLATFORM_HOST.TH2;
    case PLATFORM.TW2:
      return PLATFORM_HOST.TW2;
    case PLATFORM.VN2:
      return PLATFORM_HOST.VN2;
    default:
      return PLATFORM_HOST.NA1;
  }
};
