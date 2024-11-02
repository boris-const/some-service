import { Link } from 'react-router-dom';
import { TableColumnsType, Flex, Typography, Button } from 'antd';

import { CoinsDataType } from '../../api/coins-api/classes';

const columns = (): TableColumnsType<CoinsDataType> => {
  return [
    {
      title: 'Тикер',
      fixed: 'left',
      render: (_: any, record: CoinsDataType) => (
        <>
          <Flex>
            <Typography style={{ marginLeft: '10px' }}>{record.ticker}</Typography>
          </Flex>
        </>
      ),
    },
    {
      title: 'Обмены',
      render: (_: any, record: CoinsDataType) => (
        <>
          <Link to={`/exchanges?coin=${record.id}`}>
            <Button>Перейти</Button>
          </Link>
        </>
      ),
    },
    {
      title: 'Инструменты',
      render: (_: any, record: CoinsDataType) => (
        <>
          <Link to={`/extools?coin=${record.id}`}>
            <Button>Перейти</Button>
          </Link>
        </>
      ),
    },
    {
      title: 'Обменные пары',
      render: (_: any, record: CoinsDataType) => (
        <>
          <Link to={`/expairs?coin=${record.id}`}>
            <Button type="primary">Перейти</Button>
          </Link>
        </>
      ),
    },
  ];
};

export { columns };
