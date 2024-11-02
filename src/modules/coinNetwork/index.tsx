import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Layout, Table } from 'antd';
import { Header, Content } from 'antd/es/layout/layout';

import { columns } from './columns';
import style from './styles/style.module.scss';
import { SearchField } from '../../common/components/SearchField';
import { getCoinNetworksParams } from '../../api/coinNetworks-api/classes';
import { Loader } from '../../common/components/Loader';
import { useModulesContext } from '../../context/ModulesContextProvider';

const View = () => {
  const { CoinNetworkStore } = useModulesContext();
  const [loading, setLoading] = useState(true);

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    perPageValue: 50,
  });

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const props: getCoinNetworksParams = {
      pageNumber: pageInfo.currentPage,
      numberOfElems: pageInfo.perPageValue,
      searchValue: searchValue !== '' ? searchValue : undefined,
    };
    CoinNetworkStore.getCoinNetworks(props).then(() => setLoading(false));
  }, [CoinNetworkStore, pageInfo, searchValue]);

  return (
    <Layout className={style.layout}>
      <Header className={style.layout__header}>
        <h1>Сети</h1>
      </Header>
      <Content className={style.layout__content}>
        <Flex vertical gap={10}>
          <SearchField searchValue={searchValue} setSearchValue={setSearchValue} fieldName="Название тикера" />
          {loading ? (
            <Loader />
          ) : (
            <Table
              rowKey="id"
              dataSource={CoinNetworkStore?.data}
              columns={columns()}
              bordered={true}
              pagination={{
                total: CoinNetworkStore.count,
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

export const CoinNetworksTable = observer(View);
