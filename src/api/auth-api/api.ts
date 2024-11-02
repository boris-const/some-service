import { API } from '..';
import { TPostSignInResponse } from './classes';

const PATHS = {
  AUTH: '/api/auth/signin',
  CHECK: '/api/auth/token-check',
  LOGOUT: '/api/auth/signout',
};

export const AuthAPI = {
  postSignIn: async (password: string) => {
    return await API.post<TPostSignInResponse>({
      url: PATHS.AUTH,
      data: {
        password,
      },
    });
  },
  getCheckToken: async (accessToken: string) => {
    return await API.get({
      url: PATHS.CHECK,
      headers: {
        'x-access-token': accessToken,
      },
    });
  },
  postSignOut: async (accessToken: string) => {
    return await API.post({
      url: PATHS.LOGOUT,
      headers: {
        'x-access-token': accessToken,
      },
    });
  },
};
