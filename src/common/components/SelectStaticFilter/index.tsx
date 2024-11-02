import { Select } from 'antd';

export type TOption<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  options: TOption<T>[];
  onSelect: (value: T) => void;
  width?: string;
  value?: T;
};

export const SelectStaticFilter = <T extends unknown>({ options, onSelect, width = '150px', value }: Props<T>) => {
  const handleChange = (value: T) => {
    onSelect(value);
  };

  const filterOption = (input: string, option?: TOption<T>) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <Select
      style={{ width: width }}
      showSearch
      value={value ? value : null}
      onChange={handleChange}
      filterOption={filterOption}
      options={options}
    />
  );
};
