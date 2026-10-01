import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
export const orvalAxiosInstance = Axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? '',
  withCredentials: true,
  timeout: 10000,
});
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => orvalAxiosInstance({ ...config, ...options }).then(({ data }) => data);
export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;
