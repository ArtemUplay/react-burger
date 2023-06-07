import styles from './loader.module.css';
import { ILoaderProps } from './loader.types';

const Loader = ({ text }: ILoaderProps) => {
  return (
    <div className={styles['loader-wrapper']}>
      <div className={styles.loader}>
        <span></span>
      </div>
      <p className="text text_type_main-default">{text}</p>
    </div>
  );
};

export default Loader;
