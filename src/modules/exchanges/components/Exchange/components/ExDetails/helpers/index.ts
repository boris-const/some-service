import { ExPairsDataType } from '../../../../../../../api/exchangePair-api/classes';
import { Provider_1, Provider_2 } from '../../../../../../../api/exchanges-api/classes';
import { getProvidersDataByKey } from '../../../../../../../common/helpers/providers';
import { TProviders } from '../../../../../../../common/types';

export enum CurrencyType {
  EXPECTED = 'expected',
  REAL = 'real',
}

export const getCurrency = (
  type: CurrencyType,
  claimData: Provider_1 | Provider_2,
  exchange_pair: ExPairsDataType,
  providerName: TProviders
) => {
  const amountExpectedFrom = getProvidersDataByKey('amountExpectedFrom', claimData);
  const amountExpectedTo = getProvidersDataByKey('amountExpectedTo', claimData);
  const amountFrom = getProvidersDataByKey('amountFrom', claimData);
  const amountTo = getProvidersDataByKey('amountTo', claimData);

  if (type === CurrencyType.EXPECTED) {
    return (
      `${amountExpectedFrom} ` +
      `${exchange_pair.instrument_from.coin.ticker} (${exchange_pair.instrument_from.network.ticker})` +
      `  =  ` +
      `${amountExpectedTo} ` +
      `${exchange_pair.instrument_to.coin.ticker} (${exchange_pair.instrument_to.network.ticker})`
    );
  }
  if (type === CurrencyType.REAL) {
    return (
      `${amountFrom} ` +
      `${exchange_pair.instrument_from.coin.ticker} (${exchange_pair.instrument_from.network.ticker})` +
      `  =  ` +
      `${amountTo} ` +
      `${exchange_pair.instrument_to.coin.ticker} (${exchange_pair.instrument_to.network.ticker})`
    );
  }
};
