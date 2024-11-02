import { CopyOutlined, DownloadOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Button, Collapse, Flex } from 'antd';
import { copyFunction, downloadFunction } from '../../../../common/helpers';

type Props = {
  response: string;
};

const JSONColapse = ({ response }: Props) => {
  const genExtra = () => (
    <Flex gap={10}>
      <Button
        onClick={(event) => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
          copyFunction(response);
        }}
        icon={<CopyOutlined />}
      />
      <Button
        onClick={(event) => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
          const date = `${new Date().toLocaleDateString()}-${new Date().toLocaleTimeString()}`;
          downloadFunction(`response${date}`, 'json', response);
        }}
        icon={<DownloadOutlined />}
      />
    </Flex>
  );

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Expand JSON response',
      children: <pre>{response}</pre>,
      extra: genExtra(),
    },
  ];

  return (
    <>
      <Collapse expandIconPosition={'start'} items={items} accordion={true} />
    </>
  );
};

export default JSONColapse;
