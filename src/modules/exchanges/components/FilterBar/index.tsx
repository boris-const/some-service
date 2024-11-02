import { Flex } from 'antd';
import { observer } from 'mobx-react-lite';

import { GrayWrap } from '../../../../common/components/GrayWrap';
import { SearchField } from '../../../../common/components/SearchField';
import { ActionValueTypes, FiltersType, IActionTypes } from '../../filterReducer';

import { useModulesContext } from '../../../../context/ModulesContextProvider';
import { SelectClaimStatus, selectClaimStatusesArr, selectProviders, SelectProviders } from '../../../../common/types';
import { InputWrapper } from '../../../../common/components/InputWrapper';
import { SelectStaticFilter } from '../../../../common/components/SelectStaticFilter';

import { SelectDebounceFilter, TSelectDebounceValue } from '../../../../common/components/SelectDebounceFilter';
import { FilteringDateType } from '../../../../common/components/DateFilters/DateFilter';
import { useLocation } from 'react-router-dom';
import { TImportedFilters } from '../..';
import { DateFilterTest } from '../../../../common/components/DateFilters/DateFilterTest';

type Props = {
  filters: FiltersType;
  onFilter: (value: ActionValueTypes, key: IActionTypes) => void;
};

const View = ({ filters, onFilter }: Props) => {
  const {
    CoinsStore: { getSelectCoins },
    CoinNetworkStore: { getSelectNetwork },
  } = useModulesContext();

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

  function handleProviderSelect(value: SelectProviders) {
    const selectProvider = value === 'ALL' ? undefined : value;
    onFilter({ providerName: selectProvider }, 'providerName');
  }

  function handleClaimStatusSelect(value: SelectClaimStatus) {
    const selectedStatus = value === 'ALL' ? undefined : value;
    onFilter({ claimStatus: selectedStatus }, 'status');
  }

  function handleSearch(value: string) {
    onFilter({ inputText: value }, 'searchValue');
  }
  function handleSearchAdressFrom(value: string) {
    onFilter({ inputText: value }, 'addressFrom');
  }

  function handleSearchAdressTo(value: string) {
    onFilter({ inputText: value }, 'addressTo');
  }

  function handleDateFilter(value: FilteringDateType) {
    onFilter({ filteringDate: value }, 'filteringDate');
  }

  const providerData = selectProviders.map((el) => ({ label: el, value: el }));
  const claimStatusesData = selectClaimStatusesArr.map((el) => ({ label: el, value: el }));

  const locationState = useLocation().state as TImportedFilters | null;

  return (
    <Flex vertical gap={10}>
      <GrayWrap width="1150px">
        <Flex gap={10}>
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
        <Flex gap={10}>
          <InputWrapper titleName="Провайдер">
            <SelectStaticFilter<SelectProviders>
              options={providerData}
              onSelect={handleProviderSelect}
              value={filters.providerName ? filters.providerName : 'ALL'}
            />
          </InputWrapper>
          <InputWrapper titleName="Статус обмена">
            <SelectStaticFilter<SelectClaimStatus>
              options={claimStatusesData}
              onSelect={handleClaimStatusSelect}
              value={filters.status ? filters.status : 'ALL'}
            />
          </InputWrapper>
          <SearchField
            fieldName="Адрес ввода"
            searchValue={filters.addressFrom}
            setSearchValue={handleSearchAdressFrom}
          />
          <SearchField fieldName="Адрес вывода" searchValue={filters.addressTo} setSearchValue={handleSearchAdressTo} />
        </Flex>
      </GrayWrap>
      <GrayWrap width="420px">
        {/* todo remove to archive components */}
        {/* <DateOptionsFilter
          filteringDate={{ dateFrom: filters.dateFrom, dateTo: filters.dateTo }}
          onDateFilter={handleDateFilter}
          activeStatus={locationState ? true : false}
        /> */}
        <DateFilterTest
          filteringDate={{ dateFrom: filters.dateFrom, dateTo: filters.dateTo }}
          onDateFilter={handleDateFilter}
        />
      </GrayWrap>
    </Flex>
  );
};

export const FilterBar = observer(View);
