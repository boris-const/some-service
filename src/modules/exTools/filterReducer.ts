import { TSelectDebounceValue } from '../../common/components/SelectDebounceFilter';
import { AtLeastOne, TStatus } from '../../common/types';

export const actionTypes = ['searchValue', 'coinId', 'networkId', 'inStatus', 'outStatus'] as const;
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
  networkId: TSelectDebounceValue | undefined;
  searchValue: string | undefined;
  inStatus: TStatus;
  outStatus: TStatus;
};

export const initialFilters: FiltersType = {
  searchValue: undefined,
  coinId: undefined,
  networkId: undefined,
  inStatus: 'ALL',
  outStatus: 'ALL',
};

export const filterReducer = (filters: FiltersType, action: ActionType): FiltersType => {
  switch (action.type) {
    case 'searchValue': {
      const value = action.value?.inputText && action.value.inputText !== '' ? action.value.inputText : undefined;
      return { ...filters, searchValue: value };
    }
    case 'coinId':
    case 'networkId': {
      const value =
        action.value?.selectDebounceValue && action.value?.selectDebounceValue.length > 0
          ? action.value?.selectDebounceValue[0]
          : undefined;
      return { ...filters, [action.type]: value };
    }
    case 'inStatus': {
      const value = action.value?.pairStatus ? action.value.pairStatus : 'ALL';
      return { ...filters, inStatus: value };
    }
    case 'outStatus': {
      const value = action.value?.pairStatus ? action.value.pairStatus : 'ALL';
      return { ...filters, outStatus: value };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};
