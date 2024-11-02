import { API } from '..';
import { getToken } from '../../context/AuthContextProvider';
import {
  getExchangesParams,
  GetExchangesResponse,
  GetOneExchangeResponse,
  postAddCommentToClaimProps,
} from './classes';

const PATHS = {
  EXCHANGES: '/api/claims',
  EXCHANGESONE: '/api/claims/one',
  ADDCOMMENT: '/api/claims/comment-add',
};

export const ExchangesAPI = {
  getExchanges: async (props: getExchangesParams) => {
    const token = getToken();
    return await API.get<GetExchangesResponse>({
      url: PATHS.EXCHANGES,
      params: { ...props },
      headers: {
        'x-access-token': token,
      },
    });
  },

  getOneExchange: async (claimID: string) => {
    const token = getToken();
    return await API.get<GetOneExchangeResponse>({
      url: PATHS.EXCHANGESONE,
      params: { claimId: claimID },
      headers: {
        'x-access-token': token,
      },
    });
  },

  addCommentToClaim: async (props: postAddCommentToClaimProps) => {
    const token = getToken();
    return await API.post({
      url: PATHS.ADDCOMMENT,
      data: {
        ...props,
      },
      headers: {
        'x-access-token': token,
      },
    });
  },
};
