import { API } from '..';
import { getToken } from '../../context/AuthContextProvider';
import { GetSetiingsResponse, ToggleSettingsProps } from './classes';

const PATHS = {
  SETTINGS: '/api/global-settings',
};

export const generalSettingsAPI = {
  getSettingsList: async () => {
    const token = getToken();
    return await API.get<GetSetiingsResponse>({
      url: PATHS.SETTINGS,
      headers: {
        'x-access-token': token,
      },
    });
  },

  toggleSettingKey: async (props: ToggleSettingsProps) => {
    const token = getToken();
    return await API.patch<GetSetiingsResponse>({
      url: PATHS.SETTINGS,
      data: {
        ...props,
      },
      headers: {
        'x-access-token': token,
      },
    });
  },
};
