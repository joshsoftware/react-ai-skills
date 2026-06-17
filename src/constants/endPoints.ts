const API_BASE_AUTH = '/auth/api/v1';

export const ENDPOINTS = Object.freeze({
  LOGIN: `${API_BASE_AUTH}/login`,
  LOGOUT: `${API_BASE_AUTH}/logout`,
  REFRESH_TOKEN: `${API_BASE_AUTH}/refresh`,
} as const);
