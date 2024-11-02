export type SettingDataType = {
  id: string;
  setting_key: string;
  is_active: boolean;
  value: string | null;
};

export type GetSetiingsResponse = {
  dataList: SettingDataType[];
};

export type ToggleSettingsProps = {
  id: string;
  is_active: boolean;
  value: string | null;
};
