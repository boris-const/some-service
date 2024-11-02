import { Button, Flex, Radio, Typography } from 'antd';
import { useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

import { dateMounthAgo, dateTodayEnd, dateTodayStart, dateWeekAgo, FilteringDateType } from '../../../DateFilter';

type Props = {
  isOpen: boolean;
  onRadioDate: (value: FilteringDateType) => void;
  onTogglePanel: () => void;
};

const View = ({ isOpen, onRadioDate, onTogglePanel }: Props) => {

  // todo - lift up this state to reset selected Radio when DateFilter Changing filtering Date
  const [selectedRadio, setSelectedRadio] = useState('');

  function handleChange(value: string) {
    switch (value) {
      case 'Day': {
        onRadioDate({ dateFrom: `${dateTodayStart}`, dateTo: `${dateTodayEnd}` });
        setSelectedRadio(value);
        break;
      }
      case 'Week': {
        setSelectedRadio(value);
        onRadioDate({ dateFrom: `${dateWeekAgo}`, dateTo: `${dateTodayEnd}` });
        break;
      }
      case 'Mounth': {
        setSelectedRadio(value);
        onRadioDate({ dateFrom: `${dateMounthAgo}`, dateTo: `${dateTodayEnd}` });
      }
    }
  }
  
  return (
    <>
      <Flex justify="space-between" align="center">
        <Typography>Date Filter</Typography>
        <Radio.Group
          disabled={isOpen}
          value={selectedRadio}
          onChange={(e) => handleChange(e.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value="Day">Day</Radio.Button>
          <Radio.Button value="Week">Week</Radio.Button>
          <Radio.Button value="Mounth">Mounth</Radio.Button>
        </Radio.Group>
        <Button onClick={() => onTogglePanel()} icon={isOpen ? <ArrowUpOutlined /> : <ArrowDownOutlined />} />
      </Flex>
    </>
  );
};

export const OptionsRadio = View;
