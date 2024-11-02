import { API } from '..';
import { getToken } from '../../context/AuthContextProvider';
import { GetExToolByIDResponse, getExToolsParams, GetExToolsResponse } from './classes';

const PATHS = {
  EXTOOLS: '/api/instruments',
  EXTOOLONE: '/api/instruments/one',
};

export const ExToolsAPI = {
  getExTools: async (props: getExToolsParams) => {
    const token = getToken();
    return await API.get<GetExToolsResponse>({
      url: PATHS.EXTOOLS,
      params: {
        ...props,
      },
      headers: {
        'x-access-token': token,
      },
    });
  },

  getExToolByID: async (id: string) => {
    const token = getToken();
    return await API.get<GetExToolByIDResponse>({
      params: { instrumentId: id },
      url: PATHS.EXTOOLONE,
      headers: {
        'x-access-token': token,
      },
    });
  },
};
