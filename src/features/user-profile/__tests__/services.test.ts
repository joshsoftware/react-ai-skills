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
import { USER_PROFILE_ENDPOINTS } from '@/constants/endPoints';
import { getUserProfile } from '../services';

const mockedGet = vi.mocked(axiosInstance.get);
beforeEach(() => vi.clearAllMocks());

describe('getUserProfile', () => {
  it('GETs the user profile endpoint and returns the response data', async () => {
    const mockResponse = {
      statusCode: 200,
      status: 'success',
      message: 'OK',
      data: {
        userId: '123',
        fullName: 'Amar Josh',
        email: 'amar@example.com',
        phone: '9876543210',
        pan: 'ABCDE1234F',
        aadhaar: '123456789012',
      },
    };
    mockedGet.mockResolvedValueOnce({ data: mockResponse });

    const result = await getUserProfile('123');

    expect(mockedGet).toHaveBeenCalledWith(USER_PROFILE_ENDPOINTS.DETAIL('123'), {
      params: undefined,
    });
    expect(result).toEqual(mockResponse);
  });
});
