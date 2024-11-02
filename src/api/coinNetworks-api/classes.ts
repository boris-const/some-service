export type CoinNetworkDataType = {
  id: string;
  ticker: string;
};

export type CoinNetworkResponse = {
  count: number;
  dataList: CoinNetworkDataType[];
};

export type getCoinNetworksParams = {
  pageNumber?: number;
  numberOfElems?: number;
  searchValue?: string;
};