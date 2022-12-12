import { Grid } from  'react-loader-spinner'
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.wrapper}>
      <Grid className={css.loader} />
    </div>
  );
}