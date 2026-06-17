export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponseData {
  token: string;
  refreshToken: string;
  userAttributes: {
    userId: string;
    name: string;
    email: string;
    roles: string[];
  };
}

export interface ILoginResponse {
  statusCode: number;
  status: 'success' | 'failure';
  message: string;
  data: ILoginResponseData;
}
