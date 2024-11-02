import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Layout, Flex, Typography, Table, Button, Switch } from 'antd';
import { Header, Content } from 'antd/es/layout/layout';

import { GrayWrap } from '../../../../common/components/GrayWrap';

import { ReactComponent as BackIcon } from '../../../../assets/icon/Back.svg';
import { columns } from './columns';

import style from '../../styles/style.module.scss';
import { useModulesContext } from '../../../../context/ModulesContextProvider';

const { Title } = Typography;

const View = () => {
  const { ExToolsStore } = useModulesContext();
  const { id: queryParamId } = useParams<string>(); // useing ti grab data

  useEffect(() => {
    if (queryParamId) {
      ExToolsStore.getExtoolById(queryParamId);
    }
  }, [ExToolsStore, queryParamId]);

  const navigate = useNavigate();

  const { id: toolID, coin, network, instrument_provider_list } = ExToolsStore.toolData;

  return toolID !== undefined ? (
    <>
      <Layout className={style.layout}>
        <Header className={style.layout__header_exTool}>
          <BackIcon style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => navigate(`/extools`)} />
          <h1>{`${coin.ticker}_${network.ticker}`.toUpperCase()}</h1>
        </Header>
        <Content className={style.layout__content}>
          <div style={{ marginBottom: '30px', marginLeft: '20px' }}>
            <Flex gap={10} justify="space-between" style={{ width: '1000px' }}>
              <div>
                <Title level={4}>Ввод</Title>
                <Switch
                  checkedChildren="ВКЛ"
                  unCheckedChildren="ВЫКЛ"
                  checked={ExToolsStore.toolData.is_in_active}
                  disabled
                />
              </div>
              <div>
                <Title level={4}>Ввод</Title>
                <Switch
                  checkedChildren="ВКЛ"
                  unCheckedChildren="ВЫКЛ"
                  checked={ExToolsStore.toolData.is_out_active}
                  disabled
                />
              </div>
              <div>
                <Title level={4}>Обмены</Title>
                <Button size="large">Перейти</Button>
              </div>
              <div>
                <Title level={4}>Обменные пары</Title>
                <Button size="large">Перейти</Button>
              </div>
            </Flex>
          </div>

          <div style={{ width: 1050 }}>
            <GrayWrap>
              <Flex justify="space-between">
                <h2>Список внешних инструментов</h2>
              </Flex>
              <Table rowKey="id" dataSource={instrument_provider_list} columns={columns()} bordered />
            </GrayWrap>
          </div>
        </Content>
      </Layout>
    </>
  ) : (
    <>
      <Typography>Loading...</Typography>
    </>
  );
};

export const Tool = observer(View);
