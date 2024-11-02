import { makeAutoObservable } from 'mobx';
import { ClaimDataType, getExchangesParams, postAddCommentToClaimProps } from '../../api/exchanges-api/classes';
import { ExchangesAPI } from '../../api/exchanges-api/api';
import { TSelectDebounceValue } from '../../common/components/SelectDebounceFilter';
import { TClaimStatus, TProviders } from '../../common/types';

export type getExchangesParamsAndFIlters = {
  page: number;
  perPage: number;
  searchValue?: string;
  coinId?: TSelectDebounceValue;
  coinFromId?: TSelectDebounceValue;
  coinToId?: TSelectDebounceValue;
  networkId?: TSelectDebounceValue;
  networkFromId?: TSelectDebounceValue;
  networkToId?: TSelectDebounceValue;
  status?: TClaimStatus;
  providerName?: TProviders;
  dateFrom?: string;
  dateTo?: string;
};

class ExchangesVM {
  data: ClaimDataType[] = [];
  count: number = 0;
  responseGetOneClaimDataField = '';
  oneClaimData: ClaimDataType = {} as ClaimDataType;
  // todo - change name of function getExchanges to getData like another function
  getExchanges = async (props: getExchangesParamsAndFIlters) => {
    //todo creato more smart function to add iso data
    let transformedProps = {
      ...props,
      coinId: props?.coinId?.value,
      coinFromId: props?.coinFromId?.value,
      coinToId: props?.coinToId?.value,
      networkId: props?.networkId?.value,
      networkFromId: props?.networkFromId?.value,
      networkToId: props?.networkToId?.value,
    };

    if (props?.dateFrom && props?.dateTo) {
      transformedProps = {
        ...transformedProps,
        dateFrom: new Date(props.dateFrom).toISOString(),
        dateTo: new Date(props.dateTo).toISOString(),
      };
    }

    const res = await ExchangesAPI.getExchanges(transformedProps);
    if (res.status === 200) {
      if (res.data) {
        this.data = res.data.dataList;
        this.count = res.data.count;
      }
    }
    // todo this one vm methot which return response
    return res;
  };

  getOneExchange = async (exchangeID: string) => {
    const res = await ExchangesAPI.getOneExchange(exchangeID);
    if (res.status === 200) {
      if (res.data) {
        this.oneClaimData = res.data.claimOne;
        this.responseGetOneClaimDataField = JSON.stringify(res.data.claimOne, null, 2);
      }
    }
  };

  addComment = async (props: postAddCommentToClaimProps) => {
    const res = await ExchangesAPI.addCommentToClaim(props);
    if (res.isSuccess) {
      await this.getOneExchange(props.claimId);
    } else {
      return Error(res.errorData);
    }
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export default ExchangesVM;
