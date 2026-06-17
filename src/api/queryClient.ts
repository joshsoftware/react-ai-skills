import { QueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

const ONE_MINUTE_MS = 60_000;
const FIVE_MINUTES_MS = 5 * ONE_MINUTE_MS;

function retryPolicy(failureCount: number, error: unknown): boolean {
  if (failureCount >= 1) return false;
  if (isAxiosError(error) && error.response) {
    const status = error.response.status;
    return status >= 500 && status < 600;
  }
  return true;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_MINUTE_MS,
      gcTime: FIVE_MINUTES_MS,
      refetchOnWindowFocus: false,
      retry: retryPolicy,
    },
    mutations: {
      retry: false,
    },
  },
});
