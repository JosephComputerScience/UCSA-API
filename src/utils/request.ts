import axios, { type AxiosRequestConfig, type AxiosResponse, HttpStatusCode } from "axios";
import { is2xxStatus } from "./is2xxStatus";

const RETRY_TIMER = 1000; // 1000ms is 1s
const DEFAULT_RETRY = 3;

/** Available HTTP methods on the Request, Axios wrapper */
enum REQUEST_METHODS {
  GET = "GET",
  DELETE = "DELETE",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  // POSTFORM = 'POSTFORM', todo: support this HTTP method
  // PUTFORM = 'PUTFORM', todo: support this HTTP method
  // PATCHFORM = 'PATCHFORM' todo: support this HTTP method
}

/**
 * Axios wrapper that allows retries on request
 * @param config - Axios request config
 * @param retry - Number of retries, default is 3
 * @returns - Axios response
 */
const requestWithRetry = async <T>(config: AxiosRequestConfig, retry: number): Promise<AxiosResponse<T>> => {
  let retryCount = 0;
  do {
    const overriddenConfig = overrideConfigForRetries(config, retryCount < retry);
    const resp = await axios.request<T>(overriddenConfig);
    if (is2xxStatus(resp.status) || resp.status === HttpStatusCode.Unauthorized) {
      return resp;
    }
    // wait 1 second before retry
    setTimeout(() => {}, RETRY_TIMER);
    retryCount++;
  } while (retryCount <= retry);
  throw Error(`Maximum retries hit ${JSON.stringify(config)}`);
};

/**
 * Overrides axios request to return true when the request is still retrying
 * @param config - Axios config to overwrite validateStatus
 * @param overrideValidateStatus - overrides axios default validateStatus
 * @returns
 */
const overrideConfigForRetries = (config: AxiosRequestConfig, overrideValidateStatus: boolean): AxiosRequestConfig => {
  if (overrideValidateStatus) {
    return { ...config, validateStatus: () => true };
  }
  return { ...config, validateStatus: axios.defaults.validateStatus };
};

/**
 * Axios wrapper with retries with predefined HTTP verb for ease of use.
 */
export const request = {
  request: <T>(config: AxiosRequestConfig, retries: number = DEFAULT_RETRY) => requestWithRetry<T>(config, retries),
  get: <T>(url: string, config?: AxiosRequestConfig, retries: number = DEFAULT_RETRY) =>
    requestWithRetry<T>({ ...config, url, method: REQUEST_METHODS.GET }, retries),
  delete: <T>(url: string, config?: AxiosRequestConfig, retries: number = DEFAULT_RETRY) =>
    requestWithRetry<T>({ ...config, url, method: REQUEST_METHODS.DELETE }, retries),
  head: <T>(url: string, config?: AxiosRequestConfig, retries: number = DEFAULT_RETRY) =>
    requestWithRetry<T>({ ...config, url, method: REQUEST_METHODS.HEAD }, retries),
  options: <T>(url: string, config?: AxiosRequestConfig, retries: number = DEFAULT_RETRY) =>
    requestWithRetry<T>({ ...config, url, method: REQUEST_METHODS.OPTIONS }, retries),
  post: <T>(url: string, data?: T, config?: AxiosRequestConfig, retries: number = DEFAULT_RETRY) =>
    requestWithRetry<T>({ ...config, url, data, method: REQUEST_METHODS.POST }, retries),
  put: <T>(url: string, data?: T, config?: AxiosRequestConfig, retries: number = DEFAULT_RETRY) =>
    requestWithRetry<T>({ ...config, url, data, method: REQUEST_METHODS.PUT }, retries),
  patch: <T>(url: string, data?: T, config?: AxiosRequestConfig, retries: number = DEFAULT_RETRY) =>
    requestWithRetry<T>({ ...config, url, data, method: REQUEST_METHODS.PATCH }, retries),
  // postForm: <T=any> (url: string, data?: any, config?: AxiosRequestConfig) => {}, // support this HTTP method
  // putForm: <T=any> (url: string, data?: any, config?: AxiosRequestConfig) => {}, // support this HTTP method
  // patchForm: <T=any> (url: string, data?: any, config?: AxiosRequestConfig) => {}, // support this HTTP method
};
