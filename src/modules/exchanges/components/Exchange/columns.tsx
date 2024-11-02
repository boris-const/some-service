import { TableColumnsType, Flex, Typography } from 'antd';

import { ClaimIventDataType } from '../../../../api/exchanges-api/classes';
import { getDate } from '../../../../common/helpers';

export const columns = (): TableColumnsType<ClaimIventDataType> => [
  {
    title: 'Дата',
    width: 100,
    render: (_: any, record: ClaimIventDataType) => {
      const date = getDate(record.created_at);
      return (
        <>
          <Typography>{`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</Typography>
        </>
      );
    },
  },
  {
    title: 'Статус',
    width: 120,
    render: (_: any, record: ClaimIventDataType) => (
      <>
        <Flex gap={10}>
          <Typography>{record.title}</Typography>
        </Flex>
      </>
    ),
  },
  {
    title: 'Сообщение',
    width: 200,
    render: (_: any, record: ClaimIventDataType) => (
      <>
        <Typography>{record.description}</Typography>
      </>
    ),
  },
];
