export type CoinsDataType = {
  id: string;
  ticker: string;
};

export type CoinDataResponse = {
  count: number;
  dataList: CoinsDataType[];
};

export type getCoinsParams = {
  pageNumber?: number;
  numberOfElems?: number;
  searchValue?: string;
};
