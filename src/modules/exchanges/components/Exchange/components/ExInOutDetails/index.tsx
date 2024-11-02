import { observer } from 'mobx-react-lite';
import { Flex, Typography } from 'antd';

import style from '../../style.module.scss';

import { GrayWrap } from '../../../../../../common/components/GrayWrap';
import { InfoElement } from '../common/InfoElement';
import { useModulesContext } from '../../../../../../context/ModulesContextProvider';
import { getProvidersDataByKey } from '../../../../../../common/helpers/providers';

const View = () => {
  const { ExchangesStore } = useModulesContext();
  const { provider_1_claim, exchange_pair, provider_2_claim } = ExchangesStore.oneClaimData;
  const providerClaimData = provider_1_claim ? provider_1_claim : provider_2_claim ? provider_2_claim : null;

  const payinAddress = getProvidersDataByKey('payinAddress', providerClaimData);
  const payinExtraId = getProvidersDataByKey('payinExtraId', providerClaimData);
  const payoutAddress = getProvidersDataByKey('payoutAddress', providerClaimData);
  const payoutExtraId = getProvidersDataByKey('payoutExtraId', providerClaimData);
  const refundAddress = getProvidersDataByKey('refundAddress', providerClaimData);
  const refundExtraId = getProvidersDataByKey('refundExtraId', providerClaimData);
  const refundHash = getProvidersDataByKey('refundHash', providerClaimData);

  const isRefundHashExist = !refundHash.includes('null');

  return (
    <Flex className={style.info_section}>
      <GrayWrap>
        <Typography className={style.info_block_title}>Ввод</Typography>
        <Flex className={style.info__raw}>
          <InfoElement title="Монета" value={`${exchange_pair.instrument_from.coin.ticker}`} />
          <InfoElement title="Сеть" value={`${exchange_pair.instrument_from.network.ticker}`} />
        </Flex>
        <InfoElement title="Адрес" value={payinAddress} />
        <InfoElement title="Memo (extra_id)" value={payinExtraId} />
      </GrayWrap>

      <GrayWrap>
        <div className={style.details__title}>
          <Typography className={style.info_block_title}>Вывод</Typography>
        </div>
        <Flex className={style.info__raw}>
          <InfoElement title="Монета" value={`${exchange_pair.instrument_to.coin.ticker}`} />
          <InfoElement title="Сеть" value={`${exchange_pair.instrument_to.network.ticker}`} />
        </Flex>
        <InfoElement title="Адрес" value={payoutAddress} />
        <InfoElement title="Memo (extra_id)" value={payoutExtraId} />
      </GrayWrap>
      {providerClaimData && isRefundHashExist && (
        <GrayWrap>
          <div className={style.details__title}>
            <Typography className={style.info_block_title}>Возврат</Typography>
          </div>
          <Flex className={style.info__raw}>
            <InfoElement title="Монета" value={`${exchange_pair.instrument_to.coin.ticker}`} />
            <InfoElement title="Сеть" value={`${exchange_pair.instrument_to.network.ticker}`} />
          </Flex>
          <InfoElement title="Адрес" value={refundAddress} />
          <InfoElement title="Memo (extra_id)" value={refundExtraId} />
        </GrayWrap>
      )}
    </Flex>
  );
};

export const ExInOutDetails = observer(View);
