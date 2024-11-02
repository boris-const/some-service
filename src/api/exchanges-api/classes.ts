import { TClaimStatus, TProviders, TRateTypes } from '../../common/types';
import { ExPairsDataType } from '../exchangePair-api/classes';

export type GetExchangesResponse = {
  count: number;
  dataList: ClaimDataType[];
};

export type TProviderName = 'Provider_1' | 'Provider_2';

export type ClaimDataType = {
  id: string;
  frontend_id: string;
  provider_name: TProviderName;
  rate_type: TRateTypes;
  status: ClaimStatus;
  exchange_pair: ExPairsDataType;
  provider_1_claim: Provider_1 | null;
  provider_2_claim: Provider_2 | null;
  claim_event_list: ClaimIventDataType[];
};

export type Provider_1 = {
  provider_1_id: string;
  amount_from: string;
  amount_to: string;
  amount_expected_from: string;
  amount_expected_to: string;
  payin_address: string;
  payin_extra_id: string;
  payout_address: string;
  payout_extra_id: string;
  refund_address: string;
  refund_extra_id: string;
  payin_hash: string;
  payout_hash: string;
  refund_hash: string;

  provider_1_fee: string;
  api_extra_fee: string;
  total_fee: string;
  network_fee: string;
};

export type Provider_2 = {
  transaction_id: string;
  deposit_amount: string;
  withdrawal_amount: string;
  deposit: string;
  deposit_extra_id: string;
  withdrawal: string;
  withdrawal_extra_id: string;
  return: string;
  return_extra_id: string;
  hash_in: string;
  hash_out: string;
  return_hash: string;
  real_deposit_amount: string;
  real_withdrawal_amount: string;
};

export enum ClaimStatus {
  NEW = 'NEW',
  WAIT_DEPOSIT = 'WAIT_DEPOSIT',
  CONFIRM = 'CONFIRM',
  EXCHANGE = 'EXCHANGE',
  SEND = 'SEND',
  FINISH = 'FINISH',
  FAIL = 'FAIL',
  REFUND = 'REFUND',
  HOLD = 'HOLD',
  EXPIRE = 'EXPIRE',
}

export type GetOneExchangeResponse = {
  claimOne: ClaimDataType;
};

export type ClaimIventDataType = {
  id: string;
  title: string;
  description: string;
  claim_id: string;
  created_at: string;
};

export type getExchangesParams = {
  page: number;
  perPage: number;
  searchValue?: string;
  coinId?: string;
  coinFromId?: string;
  coinToId?: string;
  networkId?: string;
  networkFromId?: string;
  networkToId?: string;
  status?: TClaimStatus;
  providerName?: TProviders;
  dateFrom?: string;
  dateTo?: string;
  addressTo?: string;
};

export type postAddCommentToClaimProps = {
  claimId: string;
  comment: string;
};
