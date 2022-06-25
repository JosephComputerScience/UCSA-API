// external imports
import { AxiosRequestConfig } from 'axios';
// enums
import { MANDATORY_ENV_KEYS } from '../../enums';

export interface HasAPIKey extends AxiosRequestConfig {
  api_key: string;
}

export const addRiotApiKeyToConfig = <T extends HasAPIKey>(
  config?: AxiosRequestConfig
): T => {
  const newConfig = {
    ...(config && config),
    api_key: process.env[MANDATORY_ENV_KEYS.API_KEY] as string,
  };
  return newConfig as T;
};
