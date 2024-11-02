import { Button, Flex, TableColumnsType, Tooltip, Typography } from 'antd';
import { Link } from 'react-router-dom';

import style from './styles/style.module.scss';

import { ClaimDataType } from '../../api/exchanges-api/classes';
import { getColor, getDate } from '../../common/helpers';
import { getProvidersDataByKey } from '../../common/helpers/providers';

export const columns = (): TableColumnsType<ClaimDataType> => [
  {
    title: 'ID',
    render: (_: any, record: ClaimDataType) => (
      <>
        <Tooltip placement="topLeft" title={record.id}>
          <Typography style={{ fontWeight: 600, textWrap: 'nowrap' }}>{`${record.id.slice(0, 4)}`}</Typography>
        </Tooltip>
      </>
    ),
  },
  {
    title: 'Provider',
    render: (_: any, record: ClaimDataType) => (
      <>
        <Typography style={{ textWrap: 'nowrap' }}>{record.provider_name}</Typography>
      </>
    ),
  },
  {
    title: 'Направление обмена',
    render: (_: any, record: ClaimDataType) => (
      <>
        <Flex style={{ gap: '8px' }}>
          <div>
            <Flex>
              <img
                className={style.crypto_icon}
                src={record.exchange_pair.instrument_from.image_url}
                alt={record.exchange_pair.instrument_from.name}
              />
              <Typography
                style={{ marginLeft: '5px', textWrap: 'nowrap' }}
              >{`${record.exchange_pair?.instrument_from.coin.ticker}_${record.exchange_pair?.instrument_from.network.ticker}`}</Typography>
            </Flex>
          </div>
          <Typography>{'-'}</Typography>
          <div>
            <Flex>
              <img
                className={style.crypto_icon}
                src={record.exchange_pair.instrument_to.image_url}
                alt={record.exchange_pair.instrument_to.name}
              />
              <Typography
                style={{ marginLeft: '5px', textWrap: 'nowrap' }}
              >{`${record.exchange_pair.instrument_to.coin.ticker}_${record.exchange_pair.instrument_to.network.ticker}`}</Typography>
            </Flex>
          </div>
        </Flex>
      </>
    ),
  },
  {
    title: 'expected_from',
    render: (_: any, record: ClaimDataType) => {
      const { provider_1_claim, provider_2_claim } = record;
      const providerClaimData = provider_1_claim ? provider_1_claim : provider_2_claim ? provider_2_claim : null;
      const amountExpectedFrom = getProvidersDataByKey('amountExpectedFrom', providerClaimData);
      return (
        <>
          <Typography>{amountExpectedFrom}</Typography>
        </>
      );
    },
  },
  {
    title: 'expected_to',
    render: (_: any, record: ClaimDataType) => {
      const { provider_1_claim, provider_2_claim: provider_2_claim } = record;
      const providerClaimData = provider_1_claim ? provider_1_claim : provider_2_claim ? provider_2_claim : null;
      const amountExpectedTo = getProvidersDataByKey('amountExpectedTo', providerClaimData);
      return (
        <>
          <Typography style={{ textWrap: 'nowrap' }}>{amountExpectedTo}</Typography>
        </>
      );
    },
  },
  {
    title: 'real_from',
    render: (_: any, record: ClaimDataType) => {
      const { provider_1_claim, provider_2_claim: provider_2_claim } = record;
      const providerClaimData = provider_1_claim ? provider_1_claim : provider_2_claim ? provider_2_claim : null;
      const amountFrom = getProvidersDataByKey('amountFrom', providerClaimData);
      return (
        <>
          <Typography>{amountFrom}</Typography>
        </>
      );
    },
  },
  {
    title: 'real_to',
    render: (_: any, record: ClaimDataType) => {
      const { provider_1_claim, provider_2_claim: provider_2_claim } = record;
      const providerClaimData = provider_1_claim ? provider_1_claim : provider_2_claim ? provider_2_claim : null;
      const amountTo = getProvidersDataByKey('amountTo', providerClaimData);
      return (
        <>
          <Typography>{amountTo}</Typography>
        </>
      );
    },
  },
  {
    title: 'Статус',
    render: (_: any, record: ClaimDataType) => {
      const [firstC, secondC, thirdC, fourthC] = getColor(record.status);
      return (
        <Flex vertical align="center">
          <Flex gap={1}>
            <div
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: `${firstC}`,
                borderRadius: '50%',
              }}
            ></div>
            <div
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: `${secondC}`,
                borderRadius: '50%',
              }}
            ></div>
            <div
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: `${thirdC}`,
                borderRadius: '50%',
              }}
            ></div>
            <div
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: `${fourthC}`,
                borderRadius: '50%',
              }}
            ></div>
          </Flex>
          <Typography style={{ textWrap: 'nowrap' }}>{record.status}</Typography>
        </Flex>
      );
    },
  },
  {
    title: 'Дата',
    render: (_: any, record: ClaimDataType) => {
      const startDate = getDate(record.claim_event_list[0].created_at);
      return (
        <>
          <Typography>{`${startDate.toLocaleDateString()} ${startDate.toLocaleTimeString()}`}</Typography>
        </>
      );
    },
  },
  {
    title: 'Детали',
    render: (_: any, record: ClaimDataType) => (
      <>
        <Link to={`/exchanges/${record.id}`}>
          <Button>Детали</Button>
        </Link>
      </>
    ),
  },
];
