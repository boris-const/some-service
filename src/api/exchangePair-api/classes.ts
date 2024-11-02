import { TStatus } from '../../common/types';
import { ExToolsDataType } from '../exTools-api/classes';

export type ExPairsDataType = {
  id: string;
  is_active: boolean;
  instrument_from_id: string;
  instrument_to_id: string;
  instrument_from: ExToolsDataType;
  instrument_to: ExToolsDataType;
};

export type GetExPairsResponse = {
  count: number;
  dataList: ExPairsDataType[];
};

export type getExPairsParams = {
  page: number;
  perPage: number;
  searchValue?: string;
  coinFromId?: string;
  coinToId?: string;
  coinId?: string
  networkFromId?: string;
  networkToId?: string;
  networkId?: string;
  activeStatus?: TStatus;
};