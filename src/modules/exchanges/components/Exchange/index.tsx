import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Header, Content } from 'antd/es/layout/layout';
import { Layout, Table, Typography } from 'antd';

import style from './style.module.scss';

import { ReactComponent as BackIcon } from '../../../../assets/icon/Back.svg';

import { GrayWrap } from '../../../../common/components/GrayWrap';
import { Loader } from '../../../../common/components/Loader';
import { columns } from './columns';
import { ExDetails } from './components/ExDetails';
import { ExTransactionDetails } from './components/ExTransactionDetails';
import { ExDetailsCommentForm } from './components/ExDetailsCommentForm';
import { ExInOutDetails } from './components/ExInOutDetails';
import { useModulesContext } from '../../../../context/ModulesContextProvider';

const View = () => {
  const { ExchangesStore } = useModulesContext();
  const { id: claimId } = useParams<string>();

  useEffect(() => {
    if (typeof claimId === 'string') {
      ExchangesStore.getOneExchange(claimId);
    }
  }, [ExchangesStore, claimId]);

  const {} = ExchangesStore.oneClaimData;

  const navigate = useNavigate();

  return ExchangesStore?.oneClaimData?.id !== undefined && typeof claimId === 'string' ? (
    <Layout className={style.layout}>
      <Header className={style.layout__header_exchange}>
        <BackIcon style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => navigate(`/exchanges`)} />
        <h1>{claimId}</h1>
      </Header>
      <Content className={style.layout__content_OneExchange}>
        <ExDetails />
        <ExInOutDetails />
        <ExTransactionDetails />
        <ExDetailsCommentForm id={claimId} />
        <GrayWrap>
          <div className={style.table_header}>
            <Typography className={style.info_block_title}>Order events</Typography>
          </div>
          <Table
            rowKey="id"
            dataSource={ExchangesStore.oneClaimData.claim_event_list}
            columns={columns()}
            scroll={{ x: 1000, y: 2000 }}
            pagination={false}
            bordered
          />
        </GrayWrap>
      </Content>
    </Layout>
  ) : (
    <Loader />
  );
};

export const Exchange = observer(View);