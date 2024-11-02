import { useEffect, useState } from 'react';

import Router from './modules/router';
import { ModulesContextProvider } from './context/ModulesContextProvider';

import './index.css';
import './App.css';
import { useAuthContext } from './context/AuthContextProvider';
import { observer } from 'mobx-react-lite';
import { Loader } from './common/components/Loader';

function View() {
  const {
    AuthStore: { isAuth, checkToken },
  } = useAuthContext();

  const [authIsCheck, setAuthIsCheck] = useState(false);

  useEffect(() => {
    if (isAuth === false) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        checkToken(token).then(() => {
          setAuthIsCheck(true);
        });
      } else {
        setAuthIsCheck(true);
      }
    } else {
      setAuthIsCheck(true);
    }
  }, [isAuth, checkToken]);

  return authIsCheck ? (
    <ModulesContextProvider>
      <Router />
    </ModulesContextProvider>
  ) : (
    <Loader />
  );
}
export const App = observer(View);
