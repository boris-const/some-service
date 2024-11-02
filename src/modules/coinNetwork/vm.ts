import { makeAutoObservable } from 'mobx';
import { CoinNetworkDataType, getCoinNetworksParams } from '../../api/coinNetworks-api/classes';
import { CoinNetworksAPI } from '../../api/coinNetworks-api/api';

class CoinNetworkVM {
  data: CoinNetworkDataType[] = [];
  count: number = 0;

  getCoinNetworks = async (props: getCoinNetworksParams) => {
    const res = await CoinNetworksAPI.getCoinNetworks(props);
    if (res.status === 200) {
      if (res.data) {
        this.data = res.data.dataList;
        this.count = res.data.count;
      }
    }
  };

  getSelectNetwork = async (searchValue: string) => {
    const res = await CoinNetworksAPI.getCoinNetworks({ searchValue: searchValue });
    if (res.isSuccess) {
      if (res.data) {
        const selectOptions = res.data.dataList.map((el) => ({ label: el.ticker, value: el.id }));
        return selectOptions;
      }
      console.log('no data');
      return [];
    }
    console.log('Error getSelectNetwork()');
    return [];
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export default CoinNetworkVM;
