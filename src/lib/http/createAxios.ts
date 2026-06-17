import axios, { type AxiosInstance } from 'axios';
import { attachInterceptors } from './interceptors';

export interface CreateAxiosOptions {
  baseURL: string;
  timeoutMs: number;
  authHeaderName?: string;
  onUnauthorized?: () => void;
}

export function createAxios(options: CreateAxiosOptions): AxiosInstance {
  const instance = axios.create({
    baseURL: options.baseURL,
    timeout: options.timeoutMs,
    headers: { 'Content-Type': 'application/json' },
  });

  attachInterceptors(instance, {
    authHeaderName: options.authHeaderName,
    onUnauthorized: options.onUnauthorized,
  });

  return instance;
}

export function setAuthToken(
  instance: AxiosInstance,
  token: string,
  headerName = 'Authorization',
): void {
  instance.defaults.headers.common[headerName] = `Bearer ${token}`;
}

export function clearAuthToken(instance: AxiosInstance, headerName = 'Authorization'): void {
  delete instance.defaults.headers.common[headerName];
}
