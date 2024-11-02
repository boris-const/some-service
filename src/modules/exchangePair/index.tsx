import { useEffect, useReducer, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Layout, Table } from 'antd';
import { Header, Content } from 'antd/es/layout/layout';

import style from './styles/style.module.scss';

import { columns } from './columns';
import { Loader } from '../../common/components/Loader';
import { AtLeastOne } from '../../common/types';
import { ActionValueTypes, TActionTypes, filterReducer, initialFilters } from './filterReducer';

import { FilterBar } from './components/FilterBar';
import { useModulesContext } from '../../context/ModulesContextProvider';
import { getExchangesPairsParamsAndFIlters } from './vm';

const View = () => {
  const { ExchangePairStore } = useModulesContext();
  // const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    perPage: 50,
  });
  const [filters, dispatch] = useReducer(filterReducer, initialFilters);

  useEffect(() => {
    const getDataProps: getExchangesPairsParamsAndFIlters = {
      ...filters,
      ...pageInfo,
    };
    ExchangePairStore.getData(getDataProps).then(() => setLoading(false));
  }, [ExchangePairStore, pageInfo, filters]);

  function handleSelectFilter(value: AtLeastOne<ActionValueTypes>, filterType: TActionTypes) {
    dispatch({
      type: filterType,
      value: value,
    });
  }

  return (
    <>
      <Layout className={style.layout}>
        <Header className={style.layout__header}>
          <h1>Обменные пары</h1>
        </Header>
        <Content className={style.layout__content}>
          <Flex vertical gap={20}>
            <FilterBar filters={filters} onFilter={handleSelectFilter} />
            {loading ? (
              <Loader />
            ) : (
              <Table
                rowKey="id"
                dataSource={ExchangePairStore?.data}
                columns={columns()}
                bordered
                pagination={{
                  total: ExchangePairStore.count,
                  showSizeChanger: true,
                  pageSize: pageInfo.perPage,
                  onChange(page, pageSize) {
                    setPageInfo({
                      page: page,
                      perPage: pageSize,
                    });
                  },
                }}
              />
            )}
          </Flex>
        </Content>
      </Layout>
    </>
  );
};

export const ExchangePairs = observer(View);
