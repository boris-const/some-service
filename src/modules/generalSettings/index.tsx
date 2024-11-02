import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Flex, Form, Input, Layout, Popconfirm, Switch, Table, TableColumnsType, Typography } from 'antd';
import { Header, Content } from 'antd/es/layout/layout';

import style from './styles/style.module.scss';

import { Loader } from '../../common/components/Loader';
import { useModulesContext } from '../../context/ModulesContextProvider';
import { SettingDataType, ToggleSettingsProps } from '../../api/generalSettings-api/classes';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  index: number;
}

// todo remove from external
const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  children,
  ...restProps
}) => {
  return (
    <td width={1} {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex} // field to match form value and data value
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

type Props = {
  toggleSettingKey: (props: ToggleSettingsProps) => Promise<void>;
};

const View = () => {
  const { GeneralSettingsStore } = useModulesContext();
  const { getSettingsList, toggleSettingKey, data } = GeneralSettingsStore;
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSettingsList().then(() => setLoading(false));
  }, [GeneralSettingsStore, getSettingsList]);

  const [editingKey, setEditingKey] = useState<string>();

  const cancel = () => {
    setEditingKey('');
  };

  const edit = (record: Partial<SettingDataType>) => {
    form.setFieldsValue({ ...record }); // matching form values & record values
    setEditingKey(record.id);
  };

  const save = async (record: SettingDataType) => {
    await toggleSettingKey({ id: record.id, value: record.value, is_active: record.is_active });    
    setEditingKey('');
  };

  const isEditing = (record: SettingDataType) => record.id === editingKey;

  const columns = ({
    toggleSettingKey,
  }: Props): (TableColumnsType<SettingDataType>[number] & { editable?: boolean })[] => [
    {
      title: 'Key',
      render: (_: any, record) => (
        <>
          <Flex>
            <Typography style={{ marginLeft: '10px', textWrap: 'nowrap' }}>{record.setting_key}</Typography>
          </Flex>
        </>
      ),
    },
    {
      title: 'Вкл/выкл',
      render: (_: any, record: SettingDataType) => (
        <Switch
          checkedChildren="ВКЛ"
          unCheckedChildren="ВЫКЛ"
          defaultChecked
          checked={record.is_active}
          onClick={() => toggleSettingKey({ id: record.id, is_active: !record.is_active, value: record.value })}
        />
      ),
    },
    {
      title: 'Value',
      editable: true,
      render: (_: any, record) => (
        <>
          <Flex>
            <Typography style={{ marginLeft: '10px' }}>{record.value ? record.value : '---'}</Typography>
          </Flex>
        </>
      ),
    },
    {
      title: 'operation',
      render: (_: any, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => {
                save({ ...record, value: form.getFieldValue('value') });
              }}
              style={{ marginInlineEnd: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Typography.Link>Cancel</Typography.Link>
            </Popconfirm>
          </span>
        ) : (
          <Button disabled={record.value ? false : true} onClick={() => edit(record)}>
            Edit value
          </Button>
        );
      },
    },
  ];

  const mergedColumns = columns({ toggleSettingKey }).map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: SettingDataType) => ({
        editing: isEditing(record), // custom field for cell
        dataIndex: 'value',
      }),
    };
  });

  return (
    <>
      <Layout className={style.layout}>
        <Header className={style.layout__header}>
          <h1>Основные настройки</h1>
          <Flex
            justify="space-between"
            style={{
              width: 250,
              padding: '10px',
              border: '1px solid #dddddd',
              borderRadius: '10px',
            }}
          >
            <div></div>
            {/* <Typography style={{ fontWeight: 800 }}>Активация обменов</Typography>
            <Switch checkedChildren="ВКЛ" unCheckedChildren="ВЫКЛ" defaultChecked checked={true} /> */}
          </Flex>
        </Header>
        <Content className={style.layout__content}>
          {loading ? (
            <Loader />
          ) : (
            <Form form={form} component={false}>
              <Table<SettingDataType>
                rowKey="id"
                dataSource={data}
                // columns={columns({ toggleSettingKey })}
                columns={mergedColumns as TableColumnsType<SettingDataType>}
                bordered
                components={{
                  body: { cell: EditableCell },
                }}
                rowClassName={() => 'editable-row'}
              />
            </Form>
          )}
        </Content>
      </Layout>
    </>
  );
};

export const GeneralSettings = observer(View);
