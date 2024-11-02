import { useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd';
import debounce from 'lodash/debounce';

export type TSelectDebounceValue = {
  label: string;
  value: string;
};
// todo-warn Omit<SelectProps<TSelectDebounceValue[]>, 'options' | 'children'> ---> this piece of code make multiple tag choosing in arr of selects
interface DebounceSelectProps extends Omit<SelectProps<TSelectDebounceValue[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<TSelectDebounceValue[]>;
  debounceTimeout?: number;
}

export const SelectDebounceFilter = ({ fetchOptions, debounceTimeout = 700, ...props }: DebounceSelectProps) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<TSelectDebounceValue[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
};
