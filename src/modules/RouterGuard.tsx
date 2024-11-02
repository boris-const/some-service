import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContextProvider';

type Props = {
  redirectPath: string;
  children: JSX.Element | JSX.Element[];
};

export function RouterGuard({ redirectPath, children }: Props) {
  const {
    AuthStore: { isAuth },
  } = useAuthContext();

  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }
  return <>{children}</>;
}
