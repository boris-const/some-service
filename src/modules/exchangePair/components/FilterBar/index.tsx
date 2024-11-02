import { observer } from 'mobx-react-lite';
import { Flex } from 'antd';

import { GrayWrap } from '../../../../common/components/GrayWrap';
import { TActionTypes, FiltersType, ActionValueTypes } from '../../filterReducer';
import { SearchField } from '../../../../common/components/SearchField';
import { StatusRadioBox } from '../../../../common/components/StatusRadioBox';
import { AtLeastOne, TStatus } from '../../../../common/types';
import { useModulesContext } from '../../../../context/ModulesContextProvider';
import { InputWrapper } from '../../../../common/components/InputWrapper';
import { SelectDebounceFilter, TSelectDebounceValue } from '../../../../common/components/SelectDebounceFilter';

type Props = {
  filters: FiltersType;
  onFilter: (value: AtLeastOne<ActionValueTypes>, key: TActionTypes) => void;
};

const View = ({ filters, onFilter }: Props) => {
  const {
    CoinsStore: { getSelectCoins },
    CoinNetworkStore: { getSelectNetwork },
  } = useModulesContext();

  function handleSearch(value: string) {
    onFilter({ inputText: value }, 'searchValue');
  }

  function handleCoinSelect(value: TSelectDebounceValue[]) {
    const selectedValue = value;
    onFilter({ selectDebounceValue: selectedValue }, 'coinId');
  }

  function handleCoinFromSelect(value: TSelectDebounceValue[]) {
    const selectedValue = value;
    onFilter({ selectDebounceValue: selectedValue }, 'coinFromId');
  }

  function handleCoinToSelect(value: TSelectDebounceValue[]) {
    const selectedValue = value;
    onFilter({ selectDebounceValue: selectedValue }, 'coinToId');
  }

  function handleNetworkSelect(value: TSelectDebounceValue[]) {
    const selectedValue = value;
    onFilter({ selectDebounceValue: selectedValue }, 'networkId');
  }

  function handleNetworkFromSelect(value: TSelectDebounceValue[]) {
    const selectedValue = value;
    onFilter({ selectDebounceValue: selectedValue }, 'networkFromId');
  }

  function handleNetworkToSelect(value: TSelectDebounceValue[]) {
    const selectedValue = value;
    onFilter({ selectDebounceValue: selectedValue }, 'networkToId');
  }

  function handleActiveStatusSelect(value: TStatus) {
    const selectedValue = value;
    onFilter({ pairStatus: selectedValue }, 'activeStatus');
  }

  return (
    <Flex vertical gap={10}>
      <GrayWrap width="1150px">
        <></>
        <Flex justify="space-around">
          <SearchField fieldName="Поиск" searchValue={filters.searchValue} setSearchValue={handleSearch} />
          <InputWrapper titleName="Монета 1|2">
            <SelectDebounceFilter
              value={filters.coinId ? [filters.coinId] : []}
              fetchOptions={getSelectCoins}
              onChange={handleCoinSelect}
              mode="multiple"
              maxCount={1}
              placeholder="Select 1|2"
              style={{ width: '150px' }}
            />
          </InputWrapper>
          <InputWrapper titleName="Монета инструмента 1">
            <SelectDebounceFilter
              value={filters.coinFromId ? [filters.coinFromId] : []}
              fetchOptions={getSelectCoins}
              onChange={handleCoinFromSelect}
              mode="multiple"
              maxCount={1}
              placeholder="Select from"
              style={{ width: '150px' }}
            />
          </InputWrapper>
          <InputWrapper titleName="Монета инструмента 2">
            <SelectDebounceFilter
              value={filters.coinToId ? [filters.coinToId] : []}
              fetchOptions={getSelectCoins}
              onChange={handleCoinToSelect}
              mode="multiple"
              maxCount={1}
              placeholder="Select to"
              style={{ width: '150px' }}
            />
          </InputWrapper>
          <InputWrapper titleName="Сеть 1|2">
            <SelectDebounceFilter
              value={filters.networkId ? [filters.networkId] : []}
              fetchOptions={getSelectNetwork}
              onChange={handleNetworkSelect}
              mode="multiple"
              maxCount={1}
              placeholder="Select 1|2"
              style={{ width: '150px' }}
            />
          </InputWrapper>
          <InputWrapper titleName="Сеть инструмента 1">
            <SelectDebounceFilter
              value={filters.networkFromId ? [filters.networkFromId] : []}
              fetchOptions={getSelectNetwork}
              onChange={handleNetworkFromSelect}
              mode="multiple"
              maxCount={1}
              placeholder="Select from"
              style={{ width: '150px' }}
            />
          </InputWrapper>
          <InputWrapper titleName="Сеть инструмента 2">
            <SelectDebounceFilter
              value={filters.networkToId ? [filters.networkToId] : []}
              fetchOptions={getSelectNetwork}
              onChange={handleNetworkToSelect}
              mode="multiple"
              maxCount={1}
              placeholder="Select to"
              style={{ width: '150px' }}
            />
          </InputWrapper>
        </Flex>
      </GrayWrap>
      <StatusRadioBox title="ВКЛ/ВЫКЛ" statusValue={filters.activeStatus} setStatusValue={handleActiveStatusSelect} />
    </Flex>
  );
};

export const FilterBar = observer(View);
