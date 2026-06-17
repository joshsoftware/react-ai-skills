import { POST } from '@/api/http';
import { ENDPOINTS } from '@/constants/endPoints';
import type { ILoginRequest, ILoginResponse } from './types';

export const loginService = (payload: ILoginRequest): Promise<ILoginResponse> =>
  POST<ILoginRequest, ILoginResponse>(ENDPOINTS.LOGIN, payload);
