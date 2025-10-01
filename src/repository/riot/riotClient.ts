import { type RetryConfig, request } from "@/utils/request";
import { getRiotHeaders } from "@/utils/riot";
import type { AxiosRequestConfig } from "axios";

export const riotClient = <T>(config: AxiosRequestConfig) => {
  const retryConfig: RetryConfig = {
    retries: 10,
    retryTimer: 15_000,
  };
  const headers = getRiotHeaders();
  const riotConfig = { ...config };
  riotConfig.headers = { ...headers, ...config.headers };
  return request.request<T>(riotConfig, retryConfig);
};
