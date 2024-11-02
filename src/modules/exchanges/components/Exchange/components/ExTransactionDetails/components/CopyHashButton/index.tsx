import { Button } from 'antd';

import { copyFunction } from '../../../../../../../../common/helpers';

type Props = {
  value: string;
};

export const CopyHashButton = ({ value }: Props) => {
  const equalityToEmptyString = value === '';
  return (
    <Button disabled={equalityToEmptyString} onClick={() => copyFunction(value)}>
      {equalityToEmptyString ? 'No Hash' : 'CopyHASH'}
    </Button>
  );
};
