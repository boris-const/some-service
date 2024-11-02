export type TStatus = 'ALL' | 'ACTIVE' | 'INACTIVE';

export type TFileExtentions = 'json';

export const providers = ['Provider_1', 'Provider_2'] as const;
export const selectProviders = ['ALL', 'Provider_1', 'Provider_2'] as const;
export type TProviders = (typeof providers)[number];
export type SelectProviders = (typeof selectProviders)[number];

export const rateTypes = ['MARKET', 'FIXED'] as const;
export const selectRateTypes = ['ALL', 'MARKET', 'FIXED'] as const;
export type TRateTypes = (typeof rateTypes)[number];
export type SelectRateTypes = (typeof selectRateTypes)[number];

export type AtLeastOne<T> = {
  [K in keyof T]: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export const claimStatusesArr = [
  'NEW',
  'WAIT_DEPOSIT',
  'CONFIRM',
  'EXCHANGE',
  'SEND',
  'FINISH',
  'FAIL',
  'REFUND',
  'HOLD',
  'EXPIRE',
] as const;
export const selectClaimStatusesArr = [
  'ALL',
  'NEW',
  'WAIT_DEPOSIT',
  'CONFIRM',
  'EXCHANGE',
  'SEND',
  'FINISH',
  'FAIL',
  'REFUND',
  'HOLD',
  'EXPIRE',
] as const;
export type TClaimStatus = (typeof claimStatusesArr)[number];
export type SelectClaimStatus = (typeof selectClaimStatusesArr)[number];
