import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/api/axiosInstance', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/constants/endPoints';
import { loginService } from '../services';

const mockedPost = vi.mocked(axiosInstance.post);
beforeEach(() => vi.clearAllMocks());

describe('loginService', () => {
  it('POSTs to ENDPOINTS.LOGIN and returns the response data', async () => {
    const mockResponse = {
      statusCode: 200,
      status: 'success',
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
    mockedPost.mockResolvedValueOnce({ data: mockResponse });

    const result = await loginService({ username: 'admin', password: 'secret' });

    expect(mockedPost).toHaveBeenCalledWith(
      ENDPOINTS.LOGIN,
      { username: 'admin', password: 'secret' },
      undefined,
    );
    expect(result).toEqual(mockResponse);
  });
});
