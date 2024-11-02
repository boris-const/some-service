import { Radio, Typography } from 'antd';

import style from './style.module.scss';

import { GrayWrap } from '../GrayWrap';
import { TStatus } from '../../types';

type Props = {
  title: string;
  statusValue: TStatus;
  setStatusValue: (value: TStatus) => void;
};

export const StatusRadioBox = ({ statusValue, setStatusValue: onRadio, title }: Props) => {

  const handleChange = (value: TStatus) => {
    onRadio(value);
  };
  
  return (
    <GrayWrap width="290px">
      <Typography className={style.RadioBox_title}>{title}</Typography>
      <Radio.Group value={statusValue} onChange={(e) => handleChange(e.target.value)}>
        <Radio value={'ALL'}>ALL</Radio>
        <Radio value={'ACTIVE'}>ACTIVE</Radio>
        <Radio value={'INACTIVE'}>INACTIVE</Radio>
      </Radio.Group>
    </GrayWrap>
  );
};
