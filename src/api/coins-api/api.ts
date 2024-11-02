import { API } from '..';
import { getToken } from '../../context/AuthContextProvider';
import { CoinDataResponse, getCoinsParams } from './classes';

const PATHS = {
  COINS: '/api/coins',  
};

export const CoinsAPI = {
  getCoins: async (props: getCoinsParams) => {
    const token = getToken();
    return await API.get<CoinDataResponse>({
      url: PATHS.COINS,
      params: {
        ...props,
      },
      headers: {
        'x-access-token': token,
      },
    });
  }, 
};
