import { observer } from 'mobx-react-lite';
import { Typography } from 'antd';


type Props = {
  titleName: string;
  children: JSX.Element | JSX.Element[];
};

const View = ({ titleName, children }: Props) => {
  return (
    <div>
      <Typography>{titleName}</Typography>
      {children}      
    </div>
  );
};

export const InputWrapper = observer(View);
