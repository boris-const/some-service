import { createContext, useContext } from 'react';

import { makeAutoObservable } from 'mobx';
import { AuthAPI } from '../api/auth-api/api';
import { toast } from 'react-toastify';

export type AuthContextProps = {
  AuthStore: AuthVM;
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function getToken() {
  return localStorage.getItem("accessToken");
}

// modules context getter
export const useAuthContext = () => {
  return useContext<AuthContextProps>(AuthContext);
};

export const AuthContextProvider = ({ children }: Props) => {
  const store = {
    AuthStore: new AuthVM(),
  };
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

class AuthVM {
  isAuth = false;
  logIn = async (password: string) => {
    const res = await AuthAPI.postSignIn(password);
    if (res.isSuccess) {
      if (res.data) {
        localStorage.setItem('accessToken', res.data.accessToken);
        this.isAuth = true;
      }
    } else {
      toast.error(res.message);
    }
    return res.isSuccess;
  };

  checkToken = async (accessToken: string | null) => {
    if (accessToken) {
      const res = await AuthAPI.getCheckToken(accessToken);
      if (res.isSuccess) {
        if (res.data) {
          if (res.isSuccess) {
            this.isAuth = true;
          } else {
            localStorage.removeItem('accessToken');
            this.isAuth = false;
          }
        }
      }
    }
  };

  logOut = async (accessToken: string | null) => {
    if (accessToken) {
      const res = await AuthAPI.postSignOut(accessToken);
      if (res.isSuccess) {
        if (res.data) {
          if (res.isSuccess) {
            this.isAuth = false;
          } else {
            toast.error(res.message);
          }
        }
      }
    }
  };

  constructor() {
    makeAutoObservable(this);
  }
}
