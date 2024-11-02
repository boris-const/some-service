import style from './style.module.scss';

type GrayWrapProps = {
  children: JSX.Element | JSX.Element[];
  width?: string;
};

export const GrayWrap = ({ children, width }: GrayWrapProps) => {
  const element_width = width ? width : '100%';
  return (
    <div className={style.wrapper} style={{ width: `${element_width}` }}>
      {children}
    </div>
  );
};
