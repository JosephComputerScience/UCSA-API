import axios, { AxiosRequestConfig, AxiosResponse, HttpStatusCode } from 'axios';
import { is2xxStatus } from './is2xxStatus';

const RETRY_TIMER = 1000; // 1000ms is 1s
const DEFAULT_RETRY = 3;

/** Available HTTP methods on the Request, Axios wrapper */
enum REQUEST_METHODS {
  GET = 'GET',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
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
const requestWithRetry = async <T = any>(config: AxiosRequestConfig, retry: number): Promise<AxiosResponse<T>> => {
  let retryCount = 1;
  // could not set resp to undefined, typescript throwing
  // weird error even though resp would never be undefined
  let resp = await axios.request<T>(config);

  while (retryCount < retry) {
    resp = await axios.request<T>(config);

    if (is2xxStatus(resp.status) || resp.status === HttpStatusCode.Unauthorized) {
      return resp;
    }
    // wait 1 second before retry
    setTimeout(() => {}, RETRY_TIMER);
    retryCount++;
  }

  return resp;
};

export const request = {
  request: <T = any>(config: AxiosRequestConfig, retries: number = DEFAULT_RETRY) => requestWithRetry<T>(config, retries),
  get: <T = any>(url: string, config?: AxiosRequestConfig, retries: number = DEFAULT_RETRY) => requestWithRetry<T>({ ...config, url, method: REQUEST_METHODS.GET }, retries),
  delete: <T = any>(url: string, config?: AxiosRequestConfig, retries: number = DEFAULT_RETRY) => requestWithRetry<T>({ ...config, url, method: REQUEST_METHODS.DELETE }, retries),
  head: <T = any>(url: string, config?: AxiosRequestConfig, retries: number = DEFAULT_RETRY) => requestWithRetry<T>({ ...config, url, method: REQUEST_METHODS.HEAD }, retries),
  options: <T = any>(url: string, config?: AxiosRequestConfig, retries: number = DEFAULT_RETRY) => requestWithRetry<T>({ ...config, url, method: REQUEST_METHODS.OPTIONS }, retries),
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig, retries: number = DEFAULT_RETRY) => requestWithRetry<T>({ ...config, url, data, method: REQUEST_METHODS.POST }, retries),
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig, retries: number = DEFAULT_RETRY) => requestWithRetry<T>({ ...config, url, data, method: REQUEST_METHODS.PUT }, retries),
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig, retries: number = DEFAULT_RETRY) => requestWithRetry<T>({ ...config, url, data, method: REQUEST_METHODS.PATCH }, retries)
  // postForm: <T=any> (url: string, data?: any, config?: AxiosRequestConfig) => {}, // support this HTTP method
  // putForm: <T=any> (url: string, data?: any, config?: AxiosRequestConfig) => {}, // support this HTTP method
  // patchForm: <T=any> (url: string, data?: any, config?: AxiosRequestConfig) => {}, // support this HTTP method
};
