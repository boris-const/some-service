import { Collapse } from 'antd';
import { OptionsRadio } from './components/OptionsRadio';
import { DateFilter, FilteringDateType } from '../DateFilter';
import { useState } from 'react';

type Props = {
  filteringDate: FilteringDateType;
  onDateFilter: (value: FilteringDateType) => void;
  width?: string;
  activeStatus?: boolean;
};

const View = ({ width, filteringDate, onDateFilter, activeStatus = false }: Props) => {
  const [activePanel, setActivePanel] = useState(activeStatus);

  function handleTogleCollapsePanel() {
    setActivePanel(!activePanel);
  }

  return (
    <Collapse
      style={{ width: width }}
      collapsible="icon"
      activeKey={activePanel ? '1' : ''}
      items={[
        {
          key: '1',
          label: (
            <OptionsRadio onTogglePanel={handleTogleCollapsePanel} onRadioDate={onDateFilter} isOpen={activePanel} />
          ),
          children: (
            <>
              <DateFilter filteringDate={{ ...filteringDate }} onDateFilter={onDateFilter} />
            </>
          ),
          showArrow: false,
        },
      ]}
    />
  );
};

export const DateOptionsFilter = View;
