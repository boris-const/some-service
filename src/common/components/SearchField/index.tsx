import { SearchOutlined } from '@ant-design/icons';
import { Flex, Typography, Input } from 'antd';

type Props = {
  fieldName: string;
  searchValue: string | undefined;
  setSearchValue: (value: string) => void;
};

export const SearchField = ({ searchValue, setSearchValue: onSearch, fieldName }: Props) => {
  function handleChange(value: string) {
    onSearch(value);
  }

  return (
    <Flex gap={10} style={{ flexDirection: 'column' }}>
      <div>
        <Typography>{fieldName}</Typography>
        <Input
          style={{ width: 150 }}
          addonBefore={<SearchOutlined />}
          value={searchValue ? searchValue : ''}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={fieldName}
        />
      </div>
    </Flex>
  );
};
