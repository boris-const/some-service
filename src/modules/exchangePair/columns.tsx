import Icon from '@ant-design/icons';
import { Button, Flex, Switch, TableColumnsType, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { ExPairsDataType } from '../../api/exchangePair-api/classes';
import { ReactComponent as ArrowRightIcon } from '../../assets/icon/arrow_Right_full.svg';

import style from './styles/style.module.scss';

export const columns = (): TableColumnsType<ExPairsDataType> => [
  {
    title: 'Инструмент 1',
    render: (_: any, record: ExPairsDataType) => (
      <>
        <Flex gap={10}>
          <img
            className={style.crypto_icon}
            src={record.instrument_from.image_url}
            alt={`img ${record.instrument_from.coin.ticker}`}
          />
          <Typography
            style={{ marginLeft: '10px' }}
          >{`${record.instrument_from.coin.ticker}_${record.instrument_from.network.ticker}`}</Typography>
          <Icon component={ArrowRightIcon} />
        </Flex>
      </>
    ),
  },
  {
    title: 'Инструмент 2',
    render: (_: any, record: ExPairsDataType) => (
      <>
        <Flex gap={10}>
          <img
            className={style.crypto_icon}
            src={record.instrument_to.image_url}
            alt={`img ${record.instrument_from.coin.ticker}`}
          />
          <Typography
            style={{ marginLeft: '10px' }}
          >{`${record.instrument_to.coin.ticker}_${record.instrument_to.network.ticker}`}</Typography>
          <Icon component={ArrowRightIcon} />
        </Flex>
      </>
    ),
  },
  {
    title: 'Вкл/выкл',

    render: (_: any, record: ExPairsDataType) => (
      <Switch checkedChildren="ВКЛ" unCheckedChildren="ВЫКЛ" defaultChecked checked={record.is_active} disabled />
    ),
  },
  {
    title: 'Обмены',

    render: () => (
      <>
        <Link to={`/`}>
          <Button>Перейти</Button>
        </Link>
      </>
    ),
  },
];
