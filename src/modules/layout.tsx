import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Menu, Layout as AntdLayout } from 'antd';
import Sider from 'antd/es/layout/Sider';

import style from './style.module.scss';

import { ReactComponent as CoinNetworkIcon } from '../assets/icon/carbon.svg';
import { ReactComponent as CoinIcon } from '../assets/icon/bag.svg';
import { ReactComponent as ToolsIcon } from '../assets/icon/clarity.svg';
import { ReactComponent as MoneyIcon } from '../assets/icon/money.svg';
import { ReactComponent as ExchangesIcon } from '../assets/icon/exchange.svg';
import { ReactComponent as ClearingIcon } from '../assets/icon/clearing.svg';
import { ReactComponent as GenSettingIcon } from '../assets/icon/setting.svg';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuthContext } from '../context/AuthContextProvider';

type TGetCurrentMenuItem = {
  label: string;
  key: string;
  icon: JSX.Element;
};

function getCurrentMenuItem(menuItemsArr: TGetCurrentMenuItem[], path: string) {
  for (let i = menuItemsArr.length - 1; i >= 0; i--) {
    const elem = menuItemsArr[i];
    if (path.includes(elem.key)) {
      return elem.key;
    }
  }
  return '';
}

const menuItemsArr = [
  { label: 'Сети', key: '/', icon: <CoinNetworkIcon title="CoinNetworkIcon" /> },
  { label: 'Монеты', key: '/coins', icon: <CoinIcon title="CoinIcon " /> },
  { label: 'Инструменты', key: '/extools', icon: <ToolsIcon title="ToolsIcon " /> },
  { label: 'Обменные пары', key: '/expairs', icon: <MoneyIcon title="MoneyIcon" /> },
  { label: 'Обмены', key: '/exchanges', icon: <ExchangesIcon title="ExchangesIcon" /> },
  { label: 'Клиринг', key: '/clearing', icon: <ClearingIcon title="ClearingIcon" /> },
  { label: 'Настройки', key: '/gensettings', icon: <GenSettingIcon title="GenSettingIcon" /> },
  { label: 'Выйти из системы', key: '/login', icon: <LogoutOutlined title="LogoutOutlined " /> },
];

const Layout = observer(() => {
  const [collapsed, setCollapsed] = useState(false);
  const currentPathName = window.location.pathname;
  const {
    AuthStore: { logOut },
  } = useAuthContext();

  const token = localStorage.getItem('accessToken');

  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <AntdLayout className={style.layout_main} hasSider>
        <Sider className={style.sider} onCollapse={() => toggleCollapsed()} collapsible collapsed={collapsed}>
          <Menu
            className={style.menu}
            style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}
            selectedKeys={[getCurrentMenuItem(menuItemsArr, currentPathName)]}
            mode="inline"
            inlineCollapsed={collapsed}
            onClick={(key) => {
              navigate(key.keyPath[0]);
            }}
          >
            <Menu.Item key={'/'} icon={<CoinNetworkIcon />}>
              Сети
            </Menu.Item>
            <Menu.Item key={'/coins'} icon={<CoinIcon />}>
              Монеты
            </Menu.Item>
            <Menu.Item key={'/extools'} icon={<ToolsIcon />}>
              Инструменты
            </Menu.Item>
            <Menu.Item key={'/expairs'} icon={<MoneyIcon />}>
              Обменные пары
            </Menu.Item>
            <Menu.Item key={'/exchanges'} icon={<ExchangesIcon />}>
              Обмены
            </Menu.Item>
            <Menu.Item key={'/clearing'} icon={<ClearingIcon />}>
              Клиринг
            </Menu.Item>
            <Menu.Item key={'/gensettings'} icon={<GenSettingIcon />}>
              Настройки
            </Menu.Item>
            <Menu.Item
              onClick={() => logOut(token)}
              style={{ position: 'absolute', bottom: 50 }}
              key={'/login'}
              icon={<LogoutOutlined />}
            >
              Выйти из системы
            </Menu.Item>
          </Menu>
        </Sider>
        <Outlet />
      </AntdLayout>
    </>
  );
});

export default Layout;
