import { makeAutoObservable } from 'mobx';
import { CoinsDataType, getCoinsParams } from '../../api/coins-api/classes';
import { CoinsAPI } from '../../api/coins-api/api';
import { toast } from 'react-toastify';

class CoinsVM {
  data: CoinsDataType[] = [];
  count: number = 0;

  getCoins = async (props: getCoinsParams) => {
    const res = await CoinsAPI.getCoins(props);
    if (res.status === 200) {
      if (res.data) {
        this.data = res.data.dataList;
        this.count = res.data.count;
      }
    }
  };

  getSelectCoins = async (searchValue: string) => {
    const res = await CoinsAPI.getCoins({ searchValue: searchValue });
    if (res.isSuccess) {
      if (res.data) {
        const selectOptions = res.data.dataList.map((el) => ({ label: el.ticker, value: el.id }));
        return selectOptions;
      }
      console.log('no data');
      return [];
    }
    console.log('Error getSelectCoins()');
    return [];
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export default CoinsVM;
