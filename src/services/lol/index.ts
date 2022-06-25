// external packages
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// local packages
import { addRiotApiKeyToConfig, HasAPIKey } from '../shared';

/**
 * A get method for connecting to the riot api. The riot api
 * key will be automatically added from the enviornment.
 * @param url the url for the get request
 * @param config config for the request based on AxiosRequestConfig from axios
 * @returns {Promise<AxiosResponse<T>>} return a promise with the type based on response.
 */
export const get = async <T, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>
): Promise<AxiosResponse<T, D>> => {
  const newConfig = addRiotApiKeyToConfig<HasAPIKey>(config);
  return await axios.get<T>(url, newConfig);
};

/**
 * A post method for connecting to the riot api. The riot api
 * key will be automatically added from the environment.
 * @param url the url for the post request
 * @param data the data to pass in the body
 * @param config
 * @returns
 */
export const post = async <T, D = any>(
  url: string,
  data?: D,
  config?: D
): Promise<AxiosResponse<T, D>> => {
  const newConfig = addRiotApiKeyToConfig<HasAPIKey>(config);
  return await axios.post<T>(url, data, newConfig);
};
