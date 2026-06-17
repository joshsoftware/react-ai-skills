import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { toApiError } from './errors';

export interface InterceptorOptions {
  authHeaderName?: string;
  onUnauthorized?: () => void;
}

export function attachInterceptors(
  instance: AxiosInstance,
  options: InterceptorOptions = {},
): void {
  // Response interceptor: map every error to ApiError, handle 401
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const apiError = toApiError(error);

      if (apiError.kind === 'unauthorized') {
        // Clear the auth header before redirecting
        const headerName = options.authHeaderName ?? 'Authorization';
        delete instance.defaults.headers.common[headerName];
        options.onUnauthorized?.();
      }

      return Promise.reject(apiError);
    },
  );
}
