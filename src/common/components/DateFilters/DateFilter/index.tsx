import { Flex, Input, Typography } from 'antd';

import style from './style.module.scss';

// to ISO string using UTC time zone -> should use toLocaleString() and transform result

export const dateTodayStart = new Date().toLocaleDateString('sv-SE') + 'T00:00'; // yyyy-MM-ddT00:00(Today Date start)
export const dateTodayEnd = new Date().toLocaleDateString('sv-SE') + 'T23:59'; // yyyy-MM-ddT23:59(Today Date end)
export const dateWeekAgo =
  new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('sv-SE') + 'T00:00'; // yyyy-MM-dd (Week ago Date)
export const dateMounthAgo =
  new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString('sv-SE') + 'T00:00'; // yyyy-MM-ddT00:00 (Mouth ago Date)

export type FilteringDateType = {
  dateFrom: string | undefined;
  dateTo: string | undefined;
};

type Props = {
  filteringDate: FilteringDateType;
  onDateFilter: (value: FilteringDateType) => void;
};

const View = ({ filteringDate, onDateFilter }: Props) => {
  const handleDateChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const newDate = { ...filteringDate, [name]: value };
    onDateFilter(newDate);
  };

  return (
    <Flex className={style.datafilter__content}>
      <Typography className={style.datafilter__title}>Date</Typography>
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

export const DateFilter = View;
