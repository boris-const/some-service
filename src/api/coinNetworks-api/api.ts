import { API } from '..';
import { getToken } from '../../context/AuthContextProvider';
import { CoinNetworkResponse, getCoinNetworksParams } from './classes';

const PATHS = {
  COINNETWORK: '/api/networks',  
};

export const CoinNetworksAPI = {
  getCoinNetworks: async (props: getCoinNetworksParams) => {
    const token = getToken();
    return await API.get<CoinNetworkResponse>({
      url: PATHS.COINNETWORK,
      params: { ...props },
      headers: {
        'x-access-token': token,
      },
    });
  },
};
