import ReactDOM from 'react-dom/client';

import './index.css';

import { App } from './App';
import { AuthContextProvider } from './context/AuthContextProvider';
import { AntdThemeContexProvider } from './context/AntdThemeContexProvider';
import { ToastContextProvider } from './context/ToastContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ToastContextProvider>
    <AuthContextProvider>
      <AntdThemeContexProvider>
        <App />
      </AntdThemeContexProvider>
    </AuthContextProvider>
  </ToastContextProvider>
);
