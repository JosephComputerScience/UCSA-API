import axios, { type AxiosRequestConfig, type AxiosResponse, HttpStatusCode } from "axios";
import { is2xxStatus } from "./is2xxStatus";
import { sleep } from "./sleep";

const RETRY_TIMER = 3_000;
const DEFAULT_RETRY = 3;

export type RetryConfig = {
  retries: number;
  retryTimer: number;
};

const defaultRetryConfig = { retries: DEFAULT_RETRY, retryTimer: RETRY_TIMER };

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
const requestWithRetry = async <T>(config: AxiosRequestConfig, retryConfig: RetryConfig): Promise<AxiosResponse<T>> => {
  const cleanRetryConfig = { ...defaultRetryConfig, ...retryConfig };
  const { retries, retryTimer } = cleanRetryConfig;
  let retryCount = 0;

  do {
    const overriddenConfig = overrideConfigForRetries(config, retryCount < retries);
    const resp = await axios.request<T>(overriddenConfig);
    if (is2xxStatus(resp.status) || resp.status === HttpStatusCode.Unauthorized) {
      return resp;
    }
    // wait 1 second before retry
    await sleep(retryTimer);
    retryCount++;
  } while (retryCount <= retries);
  throw Error(`Maximum retries hit url${config.url}, method: ${config.method}`);
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
  request: <T>(config: AxiosRequestConfig, retryConfig: RetryConfig = defaultRetryConfig) => requestWithRetry<T>(config, retryConfig),
  get: <T>(url: string, config?: AxiosRequestConfig, retryConfig: RetryConfig = defaultRetryConfig) =>
    requestWithRetry<T>({ ...config, url, method: REQUEST_METHODS.GET }, retryConfig),
  delete: <T>(url: string, config?: AxiosRequestConfig, retryConfig: RetryConfig = defaultRetryConfig) =>
    requestWithRetry<T>({ ...config, url, method: REQUEST_METHODS.DELETE }, retryConfig),
  head: <T>(url: string, config?: AxiosRequestConfig, retryConfig: RetryConfig = defaultRetryConfig) =>
    requestWithRetry<T>({ ...config, url, method: REQUEST_METHODS.HEAD }, retryConfig),
  options: <T>(url: string, config?: AxiosRequestConfig, retryConfig: RetryConfig = defaultRetryConfig) =>
    requestWithRetry<T>({ ...config, url, method: REQUEST_METHODS.OPTIONS }, retryConfig),
  post: <T>(url: string, data?: T, config?: AxiosRequestConfig, retryConfig: RetryConfig = defaultRetryConfig) =>
    requestWithRetry<T>({ ...config, url, data, method: REQUEST_METHODS.POST }, retryConfig),
  put: <T>(url: string, data?: T, config?: AxiosRequestConfig, retryConfig: RetryConfig = defaultRetryConfig) =>
    requestWithRetry<T>({ ...config, url, data, method: REQUEST_METHODS.PUT }, retryConfig),
  patch: <T>(url: string, data?: T, config?: AxiosRequestConfig, retryConfig: RetryConfig = defaultRetryConfig) =>
    requestWithRetry<T>({ ...config, url, data, method: REQUEST_METHODS.PATCH }, retryConfig),
  // postForm: <T=any> (url: string, data?: any, config?: AxiosRequestConfig) => {}, // support this HTTP method
  // putForm: <T=any> (url: string, data?: any, config?: AxiosRequestConfig) => {}, // support this HTTP method
  // patchForm: <T=any> (url: string, data?: any, config?: AxiosRequestConfig) => {}, // support this HTTP method
};
