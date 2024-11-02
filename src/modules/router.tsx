import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Layout from './layout';

//pages
import { ExTools } from './exTools';
import { GeneralSettings } from './generalSettings';
import { CoinNetworksTable } from './coinNetwork';
import { CoinsTable } from './coins';
import { ExchangePairs } from './exchangePair';
import { Tool } from './exTools/components/Tool';
import { Exchanges } from './exchanges';
import { Exchange } from './exchanges/components/Exchange';
import { Clearing } from './clearing';
import { Login } from '../common/components/Login';
import { RouterGuard } from './RouterGuard';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RouterGuard redirectPath="/login">
        <Layout />
      </RouterGuard>
    ),
    errorElement: <>Page not found</>,
    children: [
      {
        path: '/',
        element: <CoinNetworksTable />,
        index: true,
      },
      {
        path: 'coins',
        element: <CoinsTable />,
      },
      {
        path: 'extools',
        element: <ExTools />,
      },
      {
        path: 'extools/:id',
        element: <Tool />,
      },
      {
        path: 'expairs',
        element: <ExchangePairs />,
      },
      {
        path: 'exchanges',
        element: <Exchanges />,
      },
      {
        path: 'exchanges/:id',
        element: <Exchange />,
      },
      {
        path: 'clearing',
        element: <Clearing />,
      },
      {
        path: 'gensettings',
        element: <GeneralSettings />,
      },
    ],
  },
  { path: '/login', element: <Login /> },
]);

const Router = observer(() => {
  return <RouterProvider router={router} />;
});

export default Router;
