import { TSelectDebounceValue } from '../../common/components/SelectDebounceFilter';
import { AtLeastOne, TStatus } from '../../common/types';

export const actionTypes = [
  'searchValue',
  'coinId',
  'coinFromId',
  'coinToId',
  'networkId',
  'networkFromId',
  'networkToId',
  'activeStatus',
] as const;
export type TActionTypes = (typeof actionTypes)[number];

export type ActionValueTypes = {
  inputText?: string;
  pairStatus?: TStatus;
  selectDebounceValue?: TSelectDebounceValue[];
};

export type ActionType = {
  type: TActionTypes;
  value: AtLeastOne<ActionValueTypes>;
};

export type FiltersType = {
  coinId: TSelectDebounceValue | undefined;
  coinFromId: TSelectDebounceValue | undefined;
  coinToId: TSelectDebounceValue | undefined;
  networkId: TSelectDebounceValue | undefined;
  networkFromId: TSelectDebounceValue | undefined;
  networkToId: TSelectDebounceValue | undefined;
  searchValue: string | undefined;
  activeStatus: TStatus;
};

export const initialFilters: FiltersType = {
  searchValue: undefined,
  coinId: undefined,
  coinFromId: undefined,
  coinToId: undefined,
  networkId: undefined,
  networkFromId: undefined,
  networkToId: undefined,
  activeStatus: 'ALL',
};

export const filterReducer = (filters: FiltersType, action: ActionType): FiltersType => {
  switch (action.type) {
    // todo - another way for search
    case 'searchValue':
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
    case 'activeStatus': {
      const value = action.value?.pairStatus ? action.value.pairStatus : 'ALL';
      return { ...filters, activeStatus: value };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};
