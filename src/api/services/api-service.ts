import AxiosStatic, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import CacheService from './cache-service';
interface ApiRequestConfig extends AxiosRequestConfig {
  cache?: {
    enable?: boolean;
    maxAge?: number;
  };
}
export class ApiService {
  private axios: AxiosInstance;
  private cache;
  constructor({ cache, ...axiosConfig }: ApiRequestConfig = {}) {
    this.axios = AxiosStatic.create(axiosConfig);
    this.cache = new CacheService(cache?.maxAge);
  }
  setConfig({ cache, ...axiosConfig }: ApiRequestConfig = {}) {
    this.axios = AxiosStatic.create(axiosConfig);
    this.cache = new CacheService(cache?.maxAge);
    return this.axios;
  }
  async get<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    config?: ApiRequestConfig,
  ): Promise<R> {
    let uniqKey = '';
    let cache = null;
    if (config?.cache?.enable) {
      uniqKey = AxiosStatic.getUri({ url, params: config?.params });
      cache = this.cache.get(uniqKey);
    }
    if (cache) {
      return cache;
    }
    const response = await this.axios.get<T, R, D>(url, config);
    if (config?.cache?.enable) {
      this.cache.set(uniqKey, response, config?.cache?.maxAge);
    }
    return response;
  }
  delete<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.axios.delete<T, R, D>(url, config);
  }
  post<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.axios.post<T, R, D>(url, data, config);
  }
  put<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.axios.put<T, R, D>(url, data, config);
  }
  patch<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.axios.patch<T, R, D>(url, data, config);
  }
  get instance() {
    return this.axios;
  }
}
