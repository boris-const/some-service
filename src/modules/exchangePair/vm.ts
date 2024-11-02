import { makeAutoObservable } from 'mobx';
import { ExPairsDataType, getExPairsParams } from '../../api/exchangePair-api/classes';
import { ExPairsAPI } from '../../api/exchangePair-api/api';
import { TSelectDebounceValue } from '../../common/components/SelectDebounceFilter';
import { TStatus } from '../../common/types';

export type getExchangesPairsParamsAndFIlters = {
  page: number;
  perPage: number;
  searchValue?: string;
  coinId?: TSelectDebounceValue;
  coinFromId?: TSelectDebounceValue;
  coinToId?: TSelectDebounceValue;
  networkId?: TSelectDebounceValue;
  networkFromId?: TSelectDebounceValue;
  networkToId?: TSelectDebounceValue;
  activeStatus?: TStatus;
};

class ExchangePairVM {
  data: ExPairsDataType[] = [];
  count: number = 0;

  getData = async (props: getExchangesPairsParamsAndFIlters) => {
    const transformedProps = {
      ...props,
      coinId: props?.coinId?.value,
      coinFromId: props?.coinFromId?.value,
      coinToId: props?.coinToId?.value,
      networkId: props?.networkId?.value,
      networkFromId: props?.networkFromId?.value,
      networkToId: props?.networkToId?.value,
    };

    const res = await ExPairsAPI.getExPairs(transformedProps);
    if (res.status === 200) {
      if (res.data) {
        this.data = res.data.dataList;
        this.count = res.data.count;
      }
    }
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export default ExchangePairVM;
