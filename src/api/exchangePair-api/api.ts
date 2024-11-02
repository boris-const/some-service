import { API } from '..';
import { getToken } from '../../context/AuthContextProvider';
import { getExPairsParams, GetExPairsResponse } from './classes';

const PATHS = {
  EXPAIRS: '/api/exchange-pairs',
};

export const ExPairsAPI = {
  getExPairs: async (props: getExPairsParams) => {
    const token = getToken();
    return await API.get<GetExPairsResponse>({
      url: PATHS.EXPAIRS,
      params: {
        ...props,
      },
      headers: {
        'x-access-token': token,
      },
    });
  },

};
