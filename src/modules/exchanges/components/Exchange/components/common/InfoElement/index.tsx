import { Typography } from 'antd';

import style from './styles.module.scss';

type Props = {
  title: string;
  value?: string;
  element?: JSX.Element;
  //   data: AtLeastOne<InfoValue>;
};

// type InfoValue = {
//   value?: string;
//   element?: JSX.Element;
// };

// type AtLeastOne<T> = {
//   [K in keyof T]: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
// }[keyof T];

export const InfoElement = ({ title, value, element }: Props) => {
  // todo add correct types for requered one props (element || value) + add condition of rendering

  return (
    <>
      <div className={style.info__element}>
        <Typography className={style.info__element_title}>{title}</Typography>
        {value && <Typography className={style.info__element_data}>{value}</Typography>}
        {element && element}
      </div>
    </>
  );
};
