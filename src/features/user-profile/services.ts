import { GET } from '@/api/http';
import { USER_PROFILE_ENDPOINTS } from '@/constants/endPoints';
import type { IUserProfileResponse } from './types';

export const getUserProfile = (userId: string): Promise<IUserProfileResponse> =>
  GET<IUserProfileResponse>(USER_PROFILE_ENDPOINTS.DETAIL(userId));
