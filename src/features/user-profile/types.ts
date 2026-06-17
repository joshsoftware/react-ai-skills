export interface IUserProfileRequest {
  userId: string;
}

export interface IUserProfileData {
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  pan: string;
  aadhaar: string;
  avatarUrl?: string;
}

export interface IUserProfileResponse {
  statusCode: number;
  status: 'success' | 'failure';
  message: string;
  data: IUserProfileData;
}
