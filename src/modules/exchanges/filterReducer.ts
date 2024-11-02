import { TClaimStatus, TProviders } from '../../common/types';
import { TClearingFilters } from '../clearing/columns';
import { TSelectDebounceValue } from '../../common/components/SelectDebounceFilter';
import { dateMounthAgo, dateTodayEnd, FilteringDateType } from '../../common/components/DateFilters/DateFilter';

export const actionTypes = [
  'searchValue',
  'coinId',
  'coinFromId',
  'coinToId',
  'networkId',
  'networkFromId',
  'networkToId',
  'status',
  'providerName',
  'fromClearing',
  'filteringDate',
  'addressFrom',
  'addressTo',
] as const;
export type IActionTypes = (typeof actionTypes)[number];

export type ActionValueTypes = {
  inputText?: string;
  providerName?: TProviders;
  claimStatus?: TClaimStatus;
  clearingFilters?: TClearingFilters;
  filteringDate?: FilteringDateType;
  selectDebounceValue?: TSelectDebounceValue[];
};

export type ActionType = {
  type: IActionTypes;
  value: ActionValueTypes;
};

export type FiltersType = {
  coinId: TSelectDebounceValue | undefined;
  coinFromId: TSelectDebounceValue | undefined;
  coinToId: TSelectDebounceValue | undefined;
  networkId: TSelectDebounceValue | undefined;
  networkFromId: TSelectDebounceValue | undefined;
  networkToId: TSelectDebounceValue | undefined;
  dateTo: string | undefined;
  dateFrom: string | undefined;
  searchValue: string | undefined;
  status: TClaimStatus | undefined;
  providerName: TProviders | undefined;
  addressTo: string | undefined;
  addressFrom: string | undefined;
};

export const initialFilters: FiltersType = {
  dateTo: `${dateTodayEnd}`,
  dateFrom: `${dateMounthAgo}`,
  searchValue: undefined,
  coinId: undefined,
  coinFromId: undefined,
  coinToId: undefined,
  networkId: undefined,
  networkFromId: undefined,
  networkToId: undefined,
  status: undefined,
  providerName: undefined,
  addressTo: undefined,
  addressFrom: undefined,
};

export const filterReducer = (filters: FiltersType, action: ActionType): FiltersType => {
  switch (action.type) {
    case 'searchValue': {
      const value = action.value?.inputText && action.value.inputText !== '' ? action.value.inputText : undefined;
      return { ...filters, searchValue: value };
    }
    case 'coinId':
    case 'coinFromId':
    case 'coinToId':
    case 'networkId':
    case 'networkFromId':
    case 'networkToId': {
      const value =
        action.value?.selectDebounceValue && action.value?.selectDebounceValue.length > 0
          ? action.value?.selectDebounceValue[0]
          : undefined;
      return { ...filters, [action.type]: value };
    }
    case 'status': {
      const value = action.value?.claimStatus;
      return { ...filters, status: value };
    }
    case 'providerName': {
      const value = action.value?.providerName;
      return { ...filters, providerName: value };
    }
    case 'filteringDate': {
      const date = action.value?.filteringDate;
      return { ...filters, ...date };
    }
    case 'fromClearing': {
      const value = action.value?.clearingFilters;
      if (value) {
        return {
          ...filters,
          ...value,
        };
      }
      return { ...filters };
    }
    case 'addressTo': {
      const value = action.value?.inputText && action.value.inputText !== '' ? action.value.inputText : undefined;
      return { ...filters, addressTo: value };
    }
    case 'addressFrom': {
      const value = action.value?.inputText && action.value.inputText !== '' ? action.value.inputText : undefined;
      return { ...filters, addressFrom: value };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};
