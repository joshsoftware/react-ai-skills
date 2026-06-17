import { type ReactElement, type ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

/**
 * Creates a fresh QueryClient for tests — no retries, no caching leakage.
 */
export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

/**
 * Returns a wrapper component with QueryClientProvider for use with renderHook.
 * Each call creates a fresh QueryClient — no cross-test leakage.
 */
export function createWrapper() {
  const queryClient = createTestQueryClient();

  function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  }

  return { wrapper: Wrapper, queryClient };
}

/**
 * Renders a component wrapped in QueryClientProvider + MemoryRouter.
 * Use for any component that reads from TanStack Query or uses react-router hooks.
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { initialEntries?: string[] },
) {
  const queryClient = createTestQueryClient();
  const { initialEntries = ['/'], ...renderOptions } = options ?? {};

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </QueryClientProvider>
    );
  }

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }), queryClient };
}
