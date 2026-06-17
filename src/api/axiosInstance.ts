import { createAxios } from '@/lib/http';
import { env } from '@/env';

const axiosInstance = createAxios({
  baseURL: env.VITE_API_BASE_URL,
  timeoutMs: env.VITE_API_TIMEOUT_MS,
  authHeaderName: env.VITE_AUTH_HEADER_NAME,
  onUnauthorized: () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },
});

export default axiosInstance;
