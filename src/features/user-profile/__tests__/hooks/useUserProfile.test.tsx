import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../services', () => ({
  getUserProfile: vi.fn(),
}));

import { createWrapper } from '@/test-utils/render';
import { getUserProfile } from '../../services';
import { useUserProfile } from '../../hooks/useUserProfile';

const mockedGetProfile = vi.mocked(getUserProfile);
beforeEach(() => vi.clearAllMocks());

describe('useUserProfile', () => {
  it('fetches and exposes profile data on success', async () => {
    const mockResponse = {
      statusCode: 200,
      status: 'success' as const,
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
    mockedGetProfile.mockResolvedValueOnce(mockResponse);
    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useUserProfile('123'), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockResponse);
    expect(mockedGetProfile).toHaveBeenCalledWith('123');
  });

  it('does not fetch when userId is empty', () => {
    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useUserProfile(''), { wrapper });

    expect(result.current.fetchStatus).toBe('idle');
    expect(mockedGetProfile).not.toHaveBeenCalled();
  });
});
