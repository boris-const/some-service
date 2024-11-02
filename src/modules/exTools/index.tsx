import { useEffect, useReducer, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Flex, Layout, Table } from 'antd';
import { Header, Content } from 'antd/es/layout/layout';

import style from './styles/style.module.scss';

import { columns } from './columns';
import { SearchField } from '../../common/components/SearchField';

import { TStatus } from '../../common/types';
import { StatusRadioBox } from '../../common/components/StatusRadioBox';
import { Loader } from '../../common/components/Loader';
import { useModulesContext } from '../../context/ModulesContextProvider';
import { filterReducer, initialFilters } from './filterReducer';
import { SelectDebounceFilter, TSelectDebounceValue } from '../../common/components/SelectDebounceFilter';
import { InputWrapper } from '../../common/components/InputWrapper';
import { getExToolsParamsAndFilters } from './vm';

const View = () => {
  const {
    ExToolsStore,
    CoinNetworkStore: { getSelectNetwork },
    CoinsStore: { getSelectCoins },
  } = useModulesContext();
  const [URLSearchParams, setURLSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPageValue, setPerPageValue] = useState(50);

  const [filters, dispatch] = useReducer(filterReducer, initialFilters);

  useEffect(() => {
    const props: getExToolsParamsAndFilters = {
      pageNumber: currentPage,
      numberOfElems: perPageValue,
      ...filters,
    };
    // todo - make cool move beetwen pages
    // const URLQueryParamCoin = URLSearchParams.get('coin');
    // if (URLQueryParamCoin !== null) {
    //   setSelectedCoin(URLQueryParamCoin);
    //   setURLSearchParams({});
    // }
    // const URLQueryParamNetwork = URLSearchParams.get('network');
    // if (URLQueryParamNetwork !== null) {
    //   setSelectedNetwork(URLQueryParamNetwork);
    //   setURLSearchParams({});
    // }
    ExToolsStore.getExTools(props).then(() => setLoading(false));
  }, [ExToolsStore, currentPage, perPageValue, filters]);

  function handleCoinSelect(value: TSelectDebounceValue[]) {
    const selectedValue = value;
    dispatch({ type: 'coinId', value: { selectDebounceValue: selectedValue } });
  }

  function handleNetworkSelect(value: TSelectDebounceValue[]) {
    const selectedValue = value;
    dispatch({ type: 'networkId', value: { selectDebounceValue: selectedValue } });
  }

  function handleInStatusSelect(value: TStatus) {
    dispatch({ type: 'inStatus', value: { pairStatus: value } });
  }

  function handleOutStatusSelect(value: TStatus) {
    dispatch({ type: 'outStatus', value: { pairStatus: value } });
  }

  function handleSearch(value: string) {
    dispatch({ type: 'searchValue', value: { inputText: value } });
  }

  return (
    <>
      <Layout className={style.layout}>
        <Header className={style.layout__header}>
          <h1>Инструменты</h1>
        </Header>
        <Content className={style.layout__content}>
          <Flex vertical gap={10} className={style.content_container}>
            <Flex gap={10}>
              <SearchField fieldName="Поиск" searchValue={filters.searchValue} setSearchValue={handleSearch} />
              <InputWrapper titleName="Монета">
                <SelectDebounceFilter
                  value={filters.coinId ? [filters.coinId] : []}
                  fetchOptions={getSelectCoins}
                  onChange={handleCoinSelect}
                  mode="multiple"
                  maxCount={1}
                  placeholder="Select coin"
                  style={{ width: '150px' }}
                />
              </InputWrapper>
              <InputWrapper titleName="Сеть">
                <SelectDebounceFilter
                  value={filters.networkId ? [filters.networkId] : []}
                  fetchOptions={getSelectNetwork}
                  onChange={handleNetworkSelect}
                  mode="multiple"
                  maxCount={1}
                  placeholder="Select network"
                  style={{ width: '150px' }}
                />
              </InputWrapper>
            </Flex>
            <Flex gap={10}>
              <StatusRadioBox title="Ввод" statusValue={filters.inStatus} setStatusValue={handleInStatusSelect} />
              <StatusRadioBox title="Вывод" statusValue={filters.outStatus} setStatusValue={handleOutStatusSelect} />
            </Flex>
            {loading ? (
              <Loader />
            ) : (
              <Table
                rowKey="id"
                dataSource={ExToolsStore?.data}
                columns={columns()}
                bordered
                pagination={{
                  total: ExToolsStore.count,
                  showSizeChanger: true,
                  pageSize: perPageValue,
                  onChange(page, pageSize) {
                    setCurrentPage(page);
                    setPerPageValue(pageSize);
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

export const ExTools = observer(View);
