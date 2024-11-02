import { TStatus } from '../../common/types';
import { CoinNetworkDataType } from '../coinNetworks-api/classes';
import { CoinsDataType } from '../coins-api/classes';

export type ExToolsDataType = {
  id: string;
  key: string;
  name: string;
  priority: number;
  image_url: string;
  is_in_active: boolean;
  is_out_active: boolean;
  coin_id: string;
  network_id: string;
  coin: CoinsDataType;
  network: CoinNetworkDataType;
};

export type GetExToolsResponse = {
  count: number;
  dataList: ExToolsDataType[];
};

export type getExToolsParams = {
  pageNumber: number;
  numberOfElems: number;
  searchValue?: string;
  coinId?: string;
  networkId?: string;
  inStatus?: TStatus;
  outStatus?: TStatus;
};

export type GetExToolByIDResponse = {
  instrumentOne: ExToolOneDataType;
};

export type ExToolOneDataType = {
  id: string;
  key: string;
  name: string;
  image: string;
  is_in_active: false;
  is_out_active: true;
  coin_id: string;
  network_id: string;
  coin: CoinsDataType;
  network: CoinNetworkDataType;
  instrument_provider_list: InstrumentProviderListDataType[];
};

export type InstrumentProviderListDataType = {
  id: string;
  provider_name: string;
  name: string;
  ticker: string;
  coin: string;
  full_name: string;
  network: string;
  precision: string;
  image: string;
  payin_confirmations: string;
  address_url: string;
  extra_id_name: string;
  contract_address: string;
  is_in_active: false;
  is_out_active: true;
  is_fixed_enabled: true;
  instrument_id: string;
};
