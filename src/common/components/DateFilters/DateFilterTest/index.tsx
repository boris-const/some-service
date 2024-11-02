import { Flex, Input, Tag, Typography } from 'antd';

import style from './style.module.scss';
import { useState } from 'react';

// to ISO string using UTC time zone -> should use toLocaleString() and transform result

export const dateTodayStart = new Date().toLocaleDateString('sv-SE') + 'T00:00'; // yyyy-MM-ddT00:00(Today Date start)
export const dateTodayEnd = new Date().toLocaleDateString('sv-SE') + 'T23:59'; // yyyy-MM-ddT23:59(Today Date end)
export const dateWeekAgo =
  new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('sv-SE') + 'T00:00'; // yyyy-MM-dd (Week ago Date)
export const dateMounthAgo =
  new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString('sv-SE') + 'T00:00'; // yyyy-MM-ddT00:00 (Mouth ago Date)

// move from view to types folder
export type FilteringDateType = {
  dateFrom: string | undefined;
  dateTo: string | undefined;
};

type Props = {
  filteringDate: FilteringDateType;
  onDateFilter: (value: FilteringDateType) => void;
};
// todo using types for "switch (finalTag) {"
// type TimeIntervals = (typeof timeIntervals)[number];

const timeIntervals = ['Day', 'Week', 'Mounth'] as const;

const View = ({ filteringDate, onDateFilter }: Props) => {
  const [selectedTags, setSelectedTags] = useState<string>('Mounth');

  const handleChange = (tag: string, checked: boolean) => {
    const finalTag = checked ? tag : 'Mounth';
    setSelectedTags(finalTag);
    switch (finalTag) {
      case 'Day': {
        onDateFilter({ dateFrom: `${dateTodayStart}`, dateTo: `${dateTodayEnd}` });
        break;
      }
      case 'Week': {
        onDateFilter({ dateFrom: `${dateWeekAgo}`, dateTo: `${dateTodayEnd}` });
        break;
      }
      case 'Mounth': {
        onDateFilter({ dateFrom: `${dateMounthAgo}`, dateTo: `${dateTodayEnd}` });
      }
    }
  };

  const handleDateChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const newDate = { ...filteringDate, [name]: value };
    onDateFilter(newDate);
  };

  return (
    <Flex className={style.datafilter__content}>
      <Flex align="center" gap={10}>
        <Typography className={style.datafilter__title}>Date</Typography>
        <Flex>
          {timeIntervals.map<React.ReactNode>((tag) => (
            <Tag.CheckableTag
              key={tag}
              checked={tag === selectedTags}
              onChange={(checked) => handleChange(tag, checked)}
            >
              {tag}
            </Tag.CheckableTag>
          ))}
        </Flex>
      </Flex>
      <Flex gap={5}>
        <Input
          name="dateFrom"
          value={filteringDate.dateFrom}
          type="datetime-local"
          onChange={(e) => handleDateChange(e)}
        />
        <Input name="dateTo" value={filteringDate.dateTo} type="datetime-local" onChange={(e) => handleDateChange(e)} />
      </Flex>
    </Flex>
  );
};

export const DateFilterTest = View;
