import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';

import { SettingDataType, ToggleSettingsProps } from '../../api/generalSettings-api/classes';
import { generalSettingsAPI } from '../../api/generalSettings-api/api';

class GeneralSettingsVM {

  data: SettingDataType[] = [];

  getSettingsList = async () => {
    const res = await generalSettingsAPI.getSettingsList();
    if (res.isSuccess) {
      if (res.data) {
        this.data = res.data.dataList;
      }
    }
  };

  toggleSettingKey = async (props: ToggleSettingsProps) => {
    const res = await generalSettingsAPI.toggleSettingKey(props);
    if (res.isSuccess) {
      this.getSettingsList();
    } else {
      toast.error(`Не получилось обновить состояние свойства с id: ${props.id}`);
    }
  };

  constructor() {
    makeAutoObservable(this);
  }

}

export default GeneralSettingsVM;