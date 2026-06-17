import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../services', () => ({
  loginService: vi.fn(),
}));

import { createWrapper } from '@/test-utils/render';
import { loginService } from '../../services';
import { useLogin } from '../../hooks/useLogin';

const mockedLogin = vi.mocked(loginService);
beforeEach(() => vi.clearAllMocks());

describe('useLogin', () => {
  it('exposes the response on success', async () => {
    const mockResponse = {
      statusCode: 200,
      status: 'success' as const,
      message: 'Login successful',
      data: {
        token: 'abc',
        refreshToken: 'def',
        userAttributes: {
          userId: '1',
          name: 'Admin',
          email: 'admin@example.com',
          roles: ['admin'],
        },
      },
    };
    mockedLogin.mockResolvedValueOnce(mockResponse);
    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useLogin(), { wrapper });
    result.current.mutate({ username: 'admin', password: 'secret' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockResponse);
    expect(mockedLogin).toHaveBeenCalledWith({ username: 'admin', password: 'secret' });
  });

  it('exposes the error on failure', async () => {
    mockedLogin.mockRejectedValueOnce(new Error('Network error'));
    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useLogin(), { wrapper });
    result.current.mutate({ username: 'admin', password: 'wrong' });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeDefined();
  });
});
