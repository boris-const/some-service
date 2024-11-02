import { Button, Flex, Switch, TableColumnsType, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { ExToolsDataType } from '../../api/exTools-api/classes';

import style from './styles/style.module.scss';

export const columns = (): TableColumnsType<ExToolsDataType> => [
  {
    title: 'Icon',
    width: 30,
    render: (_: any, record: ExToolsDataType) => (
      <>
        <Flex gap={10}>
          <img className={style.crypto_icon} src={record.image_url} alt={`img ${record.coin.ticker}`} />
        </Flex>
      </>
    ),
  },
  {
    title: 'Монета',
    render: (_: any, record: ExToolsDataType) => (
      <>
        <Typography>{record.coin.ticker}</Typography>
      </>
    ),
  },
  {
    title: 'Сеть',
    render: (_: any, record: ExToolsDataType) => (
      <>
        <Typography>{record.network.ticker}</Typography>
      </>
    ),
  },
  {
    title: 'Ввод',
    render: (_: any, record: ExToolsDataType) => (
      <Switch checkedChildren="ВКЛ" unCheckedChildren="ВЫКЛ" defaultChecked checked={record.is_in_active} disabled />
    ),
  },
  {
    title: 'Вывод',
    render: (_: any, record: ExToolsDataType) => (
      <Switch checkedChildren="ВКЛ" unCheckedChildren="ВЫКЛ" defaultChecked checked={record.is_out_active} disabled />
    ),
  },
  {
    // should insert link with query params
    title: 'Обмены',
    render: (_: any) => (
      <>
        <Link to={`/`}>
          <Button>Перейти</Button>
        </Link>
      </>
    ),
  },
  {
    // should insert link with query params
    title: 'Обменные пары',
    render: (_: any, record: ExToolsDataType) => (
      <>
        <Link to={`/expairs?coin=${record.coin.id}&network=${record.network.id}`}>
          <Button>Перейти</Button>
        </Link>
      </>
    ),
  },
  {
    title: 'Детали',
    render: (_: any, record: ExToolsDataType) => (
      <>
        {/* Add road to current tool */}
        <Link to={`/extools/${record.id}`}>
          <Button>Детали</Button>
        </Link>
      </>
    ),
  },
];
