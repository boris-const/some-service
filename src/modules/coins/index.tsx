import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Layout, Table } from 'antd';

import { columns } from './columns';
import { Header, Content } from 'antd/es/layout/layout';

import style from './styles/style.module.scss';
import { SearchField } from '../../common/components/SearchField';
import { getCoinsParams } from '../../api/coins-api/classes';
import { Loader } from '../../common/components/Loader';
import { useModulesContext } from '../../context/ModulesContextProvider';

export type Toggler = {
  key?: React.Key;
  moveType?: string;
};

const View = () => {
  const { CoinsStore } = useModulesContext();

  const [loading, setLoading] = useState(true);

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    perPageValue: 50,
  });

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const props: getCoinsParams = {
      pageNumber: pageInfo.currentPage,
      numberOfElems: pageInfo.perPageValue,
      searchValue: searchValue !== '' ? searchValue : undefined,
    };
    CoinsStore.getCoins(props).then(() => setLoading(false));
  }, [CoinsStore, pageInfo, searchValue]);

  return (
    <Layout className={style.layout}>
      <Header className={style.layout__header}>
        <h1>Монеты</h1>
      </Header>
      <Content className={style.layout__content}>
        <Flex vertical gap={10}>
          <SearchField searchValue={searchValue} setSearchValue={setSearchValue} fieldName="Название тикера" />
          {loading ? (
            <Loader />
          ) : (
            <Table
              rowKey="id"
              dataSource={CoinsStore?.data}
              columns={columns()}
              bordered={true}
              pagination={{
                total: CoinsStore.count,
                showSizeChanger: true,
                pageSize: pageInfo.perPageValue,
                onChange(page, pageSize) {
                  setPageInfo({
                    currentPage: page,
                    perPageValue: pageSize,
                  });
                },
              }}
            />
          )}
        </Flex>
      </Content>
    </Layout>
  );
};

export const CoinsTable = observer(View);
