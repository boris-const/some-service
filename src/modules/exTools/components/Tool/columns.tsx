import { TableColumnsType, Typography, Switch, Button } from 'antd';
import { InstrumentProviderListDataType } from '../../../../api/exTools-api/classes';
import { Link } from 'react-router-dom';

export const columns = (): TableColumnsType<InstrumentProviderListDataType> => [
  {
    title: 'Coin Icon',
    width: 10,
    render: (_: any, record: InstrumentProviderListDataType) => (
      <>
        <img style={{ width: 25, height: 25 }} src={record.image} alt={`coin_icon}`} />
      </>
    ),
  },
  {
    title: 'Name',
    render: (_: any, record: InstrumentProviderListDataType) => (
      <>
        <Typography>{record.provider_name}</Typography>
      </>
    ),
  },
  {
    title: 'Contract',
    render: (_: any, record: InstrumentProviderListDataType) => (
      <>
        <Link to={record.address_url} target="_blank">
          <Button>{`Link to Contract`}</Button>
        </Link>
      </>
    ),
  },
  {
    title: 'ExtraID name',
    render: (_: any, record: InstrumentProviderListDataType) => (
      <>
        <Typography>{record.extra_id_name !== '' ? record.extra_id_name : 'None'}</Typography>
      </>
    ),
  },
  {
    title: 'Ввод',
    render: (_: any, record: InstrumentProviderListDataType) => (
      <Switch checkedChildren="ВКЛ" unCheckedChildren="ВЫКЛ" checked={record.is_in_active} disabled />
    ),
  },
  {
    title: 'Вывод',
    render: (_: any, record: InstrumentProviderListDataType) => (
      <Switch checkedChildren="ВКЛ" unCheckedChildren="ВЫКЛ" checked={record.is_out_active} disabled />
    ),
  },
  {
    title: 'FIX Exchage',
    render: (_: any, record: InstrumentProviderListDataType) => (
      <Switch checkedChildren="ВКЛ" unCheckedChildren="ВЫКЛ" checked={record.is_fixed_enabled} disabled />
    ),
  },
];
