import { useEffect, useReducer, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Content, Header } from 'antd/es/layout/layout';
import { Button, Flex, Layout, Table, Typography } from 'antd';

import style from './styles/style.module.scss';

import { columns } from './columns';
import InfoModal from './infoModal';
import { Loader } from '../../common/components/Loader';
import { ActionValueTypes, filterReducer, IActionTypes, initialFilters } from './filterReducer';
import { FilterBar } from './components/FilterBar';
import { useModulesContext } from '../../context/ModulesContextProvider';
import { useLocation } from 'react-router-dom';
import { TClearingFilters } from '../clearing/columns';
import { getExchangesParamsAndFIlters } from './vm';
import { SelectStaticFilter } from '../../common/components/SelectStaticFilter';
import { LoaderSmall } from '../../common/components/LoaderSmall';

export type TImportedFilters = {
  filters: TClearingFilters;
};

const View = () => {
  const { ExchangesStore } = useModulesContext();

  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingRefetch, setLoadingRefetch] = useState(false); // todo-refetch
  const [lastTimeUpdate, setLastTimeUpdate] = useState(new Date()); // todo-refetch
  const [refetchInterval, setRefetchInterval] = useState<number | null>(5000); // todo-refetch
  const [filters, dispatch] = useReducer(filterReducer, initialFilters);

  const [pageInfo, setPageInfo] = useState({
    page: 1,
    perPage: 50,
  });

  const [openInfoModal, setOpenInfoModal] = useState(false);

  useEffect(() => {
    const props: getExchangesParamsAndFIlters = {
      ...pageInfo,
      ...filters,
    };

    ExchangesStore.getExchanges(props).then(() => {
      setLoadingPage(false);
    });
    let interval: NodeJS.Timeout; // todo-refetch

    if (refetchInterval) {
      // todo-refetch
      interval = setInterval(() => {
        setLoadingRefetch(true);
        ExchangesStore.getExchanges(props).then(() => {
          setLastTimeUpdate(new Date());
          setLoadingRefetch(false);
        });
      }, refetchInterval);
    }

    return () => clearInterval(interval);
  }, [ExchangesStore, pageInfo, filters, refetchInterval]);

  const locationState = useLocation().state as TImportedFilters | null;
  useEffect(() => {
    if (locationState) {
      const clearingfilters = locationState.filters;
      dispatch({
        type: 'fromClearing',
        value: { clearingFilters: clearingfilters },
      });
    }
  }, [locationState]);

  function handleFilter(value: ActionValueTypes, filterType: IActionTypes) {
    dispatch({
      type: filterType,
      value: value,
    });
  }

  function handleRefetchIntervalSelect(value: string) {
    if (value === '0') {
      setRefetchInterval(null);
    } else {
      setRefetchInterval(Number(value));
    }
  }

  const intervalsData = [0, 2, 5, 10, 20, 30].map((el) => {
    //todo-refetch
    if (el === 0) {
      return { label: `Off`, value: `0` };
    }

    return { label: `${el} сек`, value: `${el * 1000}` };
  });

  return (
    <Layout className={style.layout}>
      <Header className={style.layout__header}>
        <Flex align="center" gap={10}>
          <h1>Обмены</h1>
          {/* todo-refetch */}
          <Flex gap={10} align="center">
            <SelectStaticFilter
              value={refetchInterval ? `${refetchInterval / 1000} сек` : 'Off'}
              width="100px"
              options={intervalsData}
              onSelect={handleRefetchIntervalSelect}
            />
            <Flex style={{ width: 140, height: 30 }} align="center" justify="center">
              {loadingRefetch ? (
                <LoaderSmall />
              ) : (
                <Typography
                  style={{ color: 'gray', textWrap: 'nowrap' }}
                >{`Last update: ${lastTimeUpdate.toLocaleTimeString()}`}</Typography>
              )}
            </Flex>
          </Flex>
        </Flex>
        <Button type="primary" size={'large'} onClick={() => setOpenInfoModal(true)}>
          Показать инструкцию
        </Button>
      </Header>
      <Content className={style.layout__content_exchanges}>
        <FilterBar filters={filters} onFilter={handleFilter} />
        <InfoModal open={openInfoModal} onCancel={() => setOpenInfoModal(false)} />
        {loadingPage ? (
          <Loader />
        ) : (
          <Table
            rowKey="id"
            scroll={{ x: 1500 }}
            dataSource={ExchangesStore?.data}
            columns={columns()}
            bordered={true}
            pagination={{
              total: ExchangesStore?.count,
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
      </Content>
    </Layout>
  );
};

export const Exchanges = observer(View);
