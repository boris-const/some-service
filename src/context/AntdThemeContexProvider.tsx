import { ConfigProvider } from 'antd';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export function AntdThemeContexProvider({ children }: Props) {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#6f26cd',
          // Alias Token
          colorBgContainer: '#7736cb13',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
