import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Flex, Typography } from 'antd';

import style from './style.module.scss';

import { GrayWrap } from '../../../../../../common/components/GrayWrap';
import { getDate } from '../../../../../../common/helpers';
import { InfoElement } from '../common/InfoElement';
import { TimeWaitingInfo } from './components/TimeWaitingInfo';
import { CurrencyType, getCurrency } from './helpers';
import JSONColapse from '../../../JSONColapse';
import { useModulesContext } from '../../../../../../context/ModulesContextProvider';
import { getProvidersDataByKey } from '../../../../../../common/helpers/providers';

const View = () => {
  const { id } = useParams<string>(); // useing ti grab data

  const { ExchangesStore } = useModulesContext();

  const {
    provider_name,
    exchange_pair,
    claim_event_list,
    status,
    rate_type,
    frontend_id,
    provider_1_claim,
    provider_2_claim,
  } = ExchangesStore.oneClaimData;

  const createdDate = getDate(claim_event_list[0]?.created_at);

  const providerClaimData = provider_1_claim ? provider_1_claim : provider_2_claim ? provider_2_claim : null;

  const providerID = getProvidersDataByKey('providerID', providerClaimData);
  const payInHash = getProvidersDataByKey('payInHash', providerClaimData);
  const payOutHash = getProvidersDataByKey('payOutHash', providerClaimData);

  return (
    <GrayWrap>
      <Flex style={{ flexDirection: 'column' }} gap={20}>
        <Flex className={style.details}>
          <Flex className={style.details__part}>
            <Typography className={style.info_block_title}>Детали заявки</Typography>
            <Flex gap={40}>
              <div className={style.infoDetail_container} style={{ width: 400, padding: '16px 10px 16px 10px' }}>
                <InfoElement title="ID номер" value={id} />
                <InfoElement title="Frontend_id" value={frontend_id} />
                <InfoElement
                  title="Дата создания (local time)"
                  value={`${createdDate?.toLocaleDateString()} ${createdDate.toLocaleTimeString()}`}
                />
              </div>
              <div className={style.infoDetail_container} style={{ width: 400, padding: '16px 10px 16px 10px' }}>
                <InfoElement
                  title="Заявленный курс"
                  value={
                    providerClaimData
                      ? getCurrency(CurrencyType.EXPECTED, providerClaimData, exchange_pair, provider_name)
                      : 'No Data'
                  }
                />
                <InfoElement
                  title="Фактический курс"
                  value={
                    providerClaimData && payInHash !== '' && payOutHash !== ''
                      ? getCurrency(CurrencyType.REAL, providerClaimData, exchange_pair, provider_name)
                      : 'No Data'
                  }
                />
              </div>
            </Flex>

            <div className={style.infoDetail_container} style={{ width: 600, padding: '16px 10px 16px 10px' }}>
              <Flex className={style.info__external} gap={60}>
                <Flex gap={20}>
                  <div>
                    <InfoElement title="Имя провайдера" value={provider_name} />
                    <InfoElement title="ID провайдера" value={providerID} />
                  </div>
                  <div>
                    <InfoElement
                      title="Коммисия"
                      value={provider_1_claim?.total_fee ? provider_1_claim.total_fee : 'No Data'}
                    />
                    <InfoElement
                      title="Коммисия сети"
                      value={provider_1_claim?.network_fee ? provider_1_claim.network_fee : 'No Data'}
                    />
                  </div>
                  <div>
                    <InfoElement
                      title="Коммисия наша"
                      value={provider_1_claim?.api_extra_fee ? `${provider_1_claim.api_extra_fee}%` : 'No Data'}
                    />
                    <InfoElement
                      title="Коммисия провайдера"
                      value={provider_1_claim?.provider_1_fee ? `${provider_1_claim.provider_1_fee}%` : 'No Data'}
                    />
                  </div>
                </Flex>
              </Flex>
            </div>
            <div className={style.infoDetail_container} style={{ width: 500, padding: '16px 10px 16px 10px' }}>
              <Flex gap={20}>
                <InfoElement title="Статус заявки" value={status} />
                <TimeWaitingInfo eventList={claim_event_list} />
                <InfoElement title="Тип курса обмена" value={rate_type} />
              </Flex>
            </div>
            {/* <div className={style.info__darknet}>
              <Typography>{`Darknet marketplace: ${'xx%'}`}</Typography>
            </div> */}
          </Flex>
        </Flex>
        <JSONColapse response={ExchangesStore.responseGetOneClaimDataField} />
      </Flex>
    </GrayWrap>
  );
};

export const ExDetails = observer(View);
