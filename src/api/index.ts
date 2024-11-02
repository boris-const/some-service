import { NetClient } from '../network/net-client';
import { getProcessEnv } from '../utils/utils-env-config';

export const API_V1_URL = `${getProcessEnv().REACT_APP_BACK_URL}`;

export const API = new NetClient().setHost(API_V1_URL);