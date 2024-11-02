import { observer } from 'mobx-react-lite';
import { Flex, Typography } from 'antd';

import style from '../../style.module.scss';
import { GrayWrap } from '../../../../../../common/components/GrayWrap';
import { InfoElement } from '../common/InfoElement';
import { CopyHashButton } from './components/CopyHashButton';
import { useModulesContext } from '../../../../../../context/ModulesContextProvider';
import { getProvidersDataByKey } from '../../../../../../common/helpers/providers';

const View = () => {
  const { ExchangesStore } = useModulesContext();

  const { provider_1_claim, exchange_pair, provider_2_claim } = ExchangesStore.oneClaimData;

  const providerClaimData = provider_1_claim ? provider_1_claim : provider_2_claim ? provider_2_claim : null;

  const amountFrom = getProvidersDataByKey('amountFrom', providerClaimData);
  const amountTo = getProvidersDataByKey('amountTo', providerClaimData);
  const payinAddress = getProvidersDataByKey('payinAddress', providerClaimData);
  const payinExtraId = getProvidersDataByKey('payinExtraId', providerClaimData);
  const payoutAddress = getProvidersDataByKey('payoutAddress', providerClaimData);
  const payoutExtraId = getProvidersDataByKey('payoutExtraId', providerClaimData);
  const refundAddress = getProvidersDataByKey('refundAddress', providerClaimData);
  const refundExtraId = getProvidersDataByKey('refundExtraId', providerClaimData);
  const payInHash = getProvidersDataByKey('payInHash', providerClaimData);
  const payOutHash = getProvidersDataByKey('payOutHash', providerClaimData);
  const refundHash = getProvidersDataByKey('refundHash', providerClaimData);

  const isPayInHashExist = !payInHash.includes('null');
  const isPayOutHashExist = !payOutHash.includes('null');
  const isRefundHashExist = !refundHash.includes('null');

  return (
    <>
      <Flex className={style.info_section}>
        {providerClaimData && isPayInHashExist && (
          <GrayWrap>
            <Typography className={style.info_block_title}>Входящая транзакция</Typography>
            <InfoElement title="Адрес получения" value={payinAddress} />
            <InfoElement title={'payin_extra_id_name'} value={payinExtraId} />
            <Flex className={style.info__raw}>
              <InfoElement title="Hash транзакции" element={<CopyHashButton value={payInHash} />} />
              <InfoElement title="Сумма" value={`${amountFrom} ${exchange_pair.instrument_from.coin.ticker}`} />
            </Flex>
          </GrayWrap>
        )}
        {providerClaimData && isPayOutHashExist && (
          <div style={{ width: '100%' }}>
            <GrayWrap>
              <Typography className={style.info_block_title}>Исходящая транзакция</Typography>
              <InfoElement title="Адрес получения" value={payoutAddress} />
              <InfoElement title={'payout_extra_id_name'} value={payoutExtraId} />
              <Flex className={style.info__raw}>
                <InfoElement title="Hash транзакции" element={<CopyHashButton value={payOutHash} />} />
                <InfoElement title="Сумма" value={`${amountTo} ${exchange_pair.instrument_to.coin.ticker}`} />
              </Flex>
            </GrayWrap>
          </div>
        )}
        {providerClaimData && isRefundHashExist && (
          <div style={{ width: '100%' }}>
            <GrayWrap>
              <Typography className={style.info_block_title}>Возвратная транзакция</Typography>
              <InfoElement title="Адрес возврата" value={refundAddress} />
              <InfoElement title={'payout_extra_id_name'} value={refundExtraId} />
              <Flex className={style.info__raw}>
                <InfoElement title="Hash транзакции" element={<CopyHashButton value={refundHash} />} />
                <InfoElement title="Сумма" value={`${amountTo} ${exchange_pair.instrument_to.coin.ticker}`} />
              </Flex>
            </GrayWrap>
          </div>
        )}
      </Flex>
    </>
  );
};

export const ExTransactionDetails = observer(View);
