import { FieldKey, ProviderClaim } from './types';

export function getProvidersDataByKey(fieldKey: FieldKey, data: ProviderClaim): string {
  let value = 'No Data';

  if (data === null) {
    return 'No Data';
  }

  switch (fieldKey) {
    case 'providerID': {
      if ('provider_1_id' in data) {
        value = data.provider_1_id ? data.provider_1_id : 'null from Provider_1';
      } else if ('transaction_id' in data) {
        value = data.transaction_id ? data.transaction_id : 'null from Provider_2';
      }
      return value;
    }
    case 'amountFrom': {
      if ('amount_from' in data) {
        value = data.amount_from ? data.amount_from : 'null from Provider_1';
      } else if ('real_deposit_amount' in data) {
        value = data.real_deposit_amount ? data.real_deposit_amount : 'null from Provider_2';
      }
      return value;
    }
    case 'amountTo': {
      if ('amount_to' in data) {
        value = data.amount_to ? data.amount_to : 'null from Provider_1';
      } else if ('real_withdrawal_amount' in data) {
        value = data.real_withdrawal_amount ? data.real_withdrawal_amount : 'null from Provider_2';
      }
      return value;
    }
    case 'amountExpectedFrom': {
      if ('amount_expected_from' in data) {
        value = data.amount_expected_from ? data.amount_expected_from : 'null from Provider_1';
      } else if ('deposit_amount' in data) {
        value = data.deposit_amount ? data.deposit_amount : 'null from Provider_2';
      }
      return value;
    }
    case 'amountExpectedTo': {
      if ('amount_expected_to' in data) {
        value = data.amount_expected_to ? data.amount_expected_to : 'null from Provider_1';
      } else if ('withdrawal_amount' in data) {
        value = data.withdrawal_amount ? data.withdrawal_amount : 'null from Provider_2';
      }
      return value;
    }
    case 'payinAddress': {
      if ('payin_address' in data) {
        value = data.payin_address ? data.payin_address : 'null from Provider_1';
      } else if ('deposit' in data) {
        value = data.deposit ? data.deposit : 'null from Provider_2';
      }
      return value;
    }
    case 'payinExtraId': {
      if ('payin_extra_id' in data) {
        value = data.payin_extra_id ? data.payin_extra_id : 'null from Provider_1';
      } else if ('deposit_extra_id' in data) {
        value = data.deposit_extra_id ? data.deposit_extra_id : 'null from Provider_2';
      }
      return value;
    }
    case 'payoutAddress': {
      if ('payout_address' in data) {
        value = data.payout_address ? data.payout_address : 'null from Provider_1';
      } else if ('withdrawal' in data) {
        value = data.withdrawal ? data.withdrawal : 'null from Provider_2';
      }
      return value;
    }
    case 'payoutExtraId': {
      if ('payout_extra_id' in data) {
        value = data.payout_extra_id ? data.payout_extra_id : 'null from Provider_1';
      } else if ('withdrawal_extra_id' in data) {
        value = data.withdrawal_extra_id ? data.withdrawal_extra_id : 'null from Provider_2';
      }
      return value;
    }
    case 'refundAddress': {
      if ('refund_address' in data) {
        value = data.refund_address ? data.refund_address : 'null from Provider_1';
      } else if ('return' in data) {
        value = data.return ? data.return : 'null from Provider_2';
      }
      return value;
    }
    case 'refundExtraId': {
      if ('refund_extra_id' in data) {
        value = data.refund_extra_id ? data.refund_extra_id : 'null from Provider_1';
      } else if ('return_extra_id' in data) {
        value = data.return_extra_id ? data.return_extra_id : 'null from Provider_2';
      }
      return value;
    }
    case 'payInHash': {
      if ('payin_hash' in data) {
        value = data.payin_hash ? data.payin_hash : 'null from Provider_1';
      } else if ('hash_in' in data) {
        value = data.hash_in ? data.hash_in : 'null from Provider_2';
      }
      return value;
    }
    case 'payOutHash': {
      if ('payout_hash' in data) {
        value = data.payout_hash ? data.payout_hash : 'null from Provider_1';
      } else if ('hash_out' in data) {
        value = data.hash_out ? data.hash_out : 'null from Provider_2';
      }
      return value;
    }
    case 'refundHash': {
      if ('refund_hash' in data) {
        value = data.refund_hash ? data.refund_hash : 'null from Provider_1';
      } else if ('return_hash' in data) {
        value = data.return_hash ? data.return_hash : 'null from Provider_2';
      }
      return value;
    }
    default: {
      return 'Data not found';
    }
  }
}
