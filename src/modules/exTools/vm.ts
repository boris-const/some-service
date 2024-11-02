import { makeAutoObservable } from 'mobx';
import { ExToolsAPI } from '../../api/exTools-api/api';
import { ExToolOneDataType, ExToolsDataType } from '../../api/exTools-api/classes';
import { TStatus } from '../../common/types';
import { TSelectDebounceValue } from '../../common/components/SelectDebounceFilter';

export type getExToolsParamsAndFilters = {
  pageNumber: number;
  numberOfElems: number;
  searchValue?: string;
  coinId?: TSelectDebounceValue;
  networkId?: TSelectDebounceValue;
  inStatus?: TStatus;
  outStatus?: TStatus;
};

class ExToolsVM {
  data: ExToolsDataType[] = [];
  count: number = 0;

  toolData: ExToolOneDataType = {} as ExToolOneDataType;

  getExTools = async (props: getExToolsParamsAndFilters) => {
    const transformedProps = {
      ...props,
      coinId: props?.coinId?.value,
      networkId: props?.networkId?.value,
    };

    const res = await ExToolsAPI.getExTools(transformedProps);
    if (res.status === 200) {
      if (res.data) {
        this.data = res.data.dataList;
        this.count = res.data.count;
      }
    }
  };

  getExtoolById = async (id: string) => {
    const res = await ExToolsAPI.getExToolByID(id);
    console.log(res.data);
    if (res.status === 200) {
      if (res.data) {
        this.toolData = res.data.instrumentOne;
        console.log(this.toolData);
      }
    }
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export default ExToolsVM;
