import style from './styles.module.scss';

export const Loader = () => {
  return (
    <div className={style.loader_container}>
      <div className={style.loader}></div>
    </div>
  );
};
