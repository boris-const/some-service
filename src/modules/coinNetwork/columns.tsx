import { Link } from 'react-router-dom';
import { TableColumnsType, Flex, Typography, Button } from 'antd';
// import Icon from "@ant-design/icons";

// import { ReactComponent as BTCIcon } from "../../assets/logo/btc.svg";
import { CoinNetworkDataType } from '../../api/coinNetworks-api/classes';

const columns = (): TableColumnsType<CoinNetworkDataType> => [
  {
    title: 'Тикер',
    width: 100,
    fixed: 'left',
    render: (_: any, record: CoinNetworkDataType) => {
      return (
        <>
          <Flex>
            <Typography style={{ marginLeft: '10px' }}>{record.ticker}</Typography>
          </Flex>
        </>
      );
    },
  },
  {
    title: 'Обмены',
    width: 100,
    render: (_: any, record: CoinNetworkDataType) => (
      <>
        <Link to={`/exchanges?network=${record.id}`}>
          <Button>Перейти</Button>
        </Link>
      </>
    ),
  },
  {
    title: 'Инструменты',
    width: 100,
    render: (_: any, record: CoinNetworkDataType) => (
      <>
        <Link to={`/extools?network=${record.id}`}>
          <Button>Перейти</Button>
        </Link>
      </>
    ),
  },
  {
    title: 'Обменные пары',
    width: 100,
    render: (_: any, record: CoinNetworkDataType) => {
      return (
        <>
          <Link to={`/expairs?network=${record.id}`}>
            <Button type="primary">Перейти</Button>
          </Link>
        </>
      );
    },
  },
];

export { columns };
