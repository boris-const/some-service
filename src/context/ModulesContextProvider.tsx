// stores to reduce into store
import { createContext, useContext } from 'react';
import ClearingVM from '../modules/clearing/vm';
import CoinNetworkVM from '../modules/coinNetwork/vm';
import CoinsVM from '../modules/coins/vm';
import ExchangePairVM from '../modules/exchangePair/vm';
import ExchangesVM from '../modules/exchanges/vm';
import ExToolsVM from '../modules/exTools/vm';
import GeneralSettingsVM from '../modules/generalSettings/vm';

export type ModulesContextProps = {
  CoinNetworkStore: CoinNetworkVM;
  CoinsStore: CoinsVM;
  ExToolsStore: ExToolsVM;
  ExchangePairStore: ExchangePairVM;
  ExchangesStore: ExchangesVM;
  GeneralSettingsStore: GeneralSettingsVM;
  ClearingStore: ClearingVM;
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const ModulesContext = createContext<ModulesContextProps>({} as ModulesContextProps);

// modules context getter
export const useModulesContext = () => {
  return useContext<ModulesContextProps>(ModulesContext);
};

export const ModulesContextProvider = ({ children }: Props) => {
  const store = {
    CoinNetworkStore: new CoinNetworkVM(),
    CoinsStore: new CoinsVM(),
    ExToolsStore: new ExToolsVM(),
    ExchangePairStore: new ExchangePairVM(),
    ExchangesStore: new ExchangesVM(),
    GeneralSettingsStore: new GeneralSettingsVM(),
    ClearingStore: new ClearingVM(),
  };
  return <ModulesContext.Provider value={store}>{children}</ModulesContext.Provider>;
};
