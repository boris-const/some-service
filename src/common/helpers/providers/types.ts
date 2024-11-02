import { Provider_1, Provider_2 } from '../../../api/exchanges-api/classes';

export type FieldKey =
  | 'providerID'
  | 'claimStatus'
  | 'amountFrom'
  | 'amountTo'
  | 'amountExpectedFrom'
  | 'amountExpectedTo'
  | 'payinAddress'
  | 'payinExtraId'
  | 'payoutAddress'
  | 'payoutExtraId'
  | 'refundAddress'
  | 'refundExtraId'
  | 'payInHash'
  | 'payOutHash'
  | 'refundHash';

export type ProviderClaim = Provider_1 | Provider_2 | null;

