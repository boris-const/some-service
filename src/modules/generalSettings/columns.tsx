export {}
// import { TableColumnsType, Flex, Typography, Switch, Popconfirm } from 'antd';
// import { SettingDataType, ToggleSettingsProps } from '../../api/generalSettings-api/classes';

// type Props = {
//   toggleSettingKey: (props: ToggleSettingsProps) => Promise<void>;
// };

// todo - (TableColumnsType<SettingDataType>[number] & { editable?: boolean })[] - разобраться в этом типе

// export const columns = ({ toggleSettingKey }: Props): (TableColumnsType<SettingDataType>[number] & { editable?: boolean })[] => [
//   {
//     title: 'Key',
//     render: (_: any, record) => (
//       <>
//         <Flex>
//           <Typography style={{ marginLeft: '10px' }}>{record.setting_key}</Typography>
//         </Flex>
//       </>
//     ),
//   },
//   {
//     title: 'Вкл/выкл',
//     render: (_: any, record: SettingDataType) => (
//       <Switch
//       checkedChildren="ВКЛ"
//       unCheckedChildren="ВЫКЛ"
//       defaultChecked
//       checked={record.is_active}
//       onClick={() => toggleSettingKey({ id: record.id, is_active: !record.is_active, value: record.value })}
//       />
//     ),
//   },
//   {
//     title: 'Value',
//     editable: true,
//     render: (_: any, record) => (
//       <>
//         <Flex>
//           <Typography style={{ marginLeft: '10px' }}>{record.value ? record.value : '---'}</Typography>
//         </Flex>
//       </>
//     ),
//   },
//   {
//     title: 'operation',
//     dataIndex: 'operation',
//     render: (_: any, record) => {
//       const editable = isEditing(record);
//       return editable ? (
//         <span>
//           <Typography.Link onClick={() => save(record.key)} style={{ marginInlineEnd: 8 }}>
//             Save
//           </Typography.Link>
//           <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//             <a>Cancel</a>
//           </Popconfirm>
//         </span>
//       ) : (
//         <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
//           Edit
//         </Typography.Link>
//       );
//     },
//   },
// ];
