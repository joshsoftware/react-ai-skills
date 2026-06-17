import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../services';

export const useUserProfile = (userId: string) =>
  useQuery({
    queryKey: ['user', 'profile', userId],
    queryFn: () => getUserProfile(userId),
    enabled: Boolean(userId),
  });
