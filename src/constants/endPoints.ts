const API_BASE_AUTH = '/auth/api/v1';
const API_BASE_USER = '/user/api/v1';

export const ENDPOINTS = Object.freeze({
  LOGIN: `${API_BASE_AUTH}/login`,
  LOGOUT: `${API_BASE_AUTH}/logout`,
  REFRESH_TOKEN: `${API_BASE_AUTH}/refresh`,
} as const);

export const USER_PROFILE_ENDPOINTS = Object.freeze({
  DETAIL: (userId: string) => `${API_BASE_USER}/users/${userId}/profile`,
} as const);
