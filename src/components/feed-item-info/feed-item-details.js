import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './feed-item-details.module.css';

const FeedItemDetails = () => {
  return (
    <div className={styles.wrapper}>
      <p
        className={`${styles['item-number']} text text_type_digits-default mb-10`}>
        #034533
      </p>
      <h2 className="text text_type_main-medium mb-3">
        Black Hole Singularity острый бургер
      </h2>
      <p className={`text text_type_main-default ${styles.text_ready} mb-15`}>
        Выполнен
      </p>
      <span className="text text_type_main-medium mb-6">Состав:</span>
      <ul className={styles.list}>
        <li className={`${styles.list__item} mt-6`}>
          <div className={styles['list__image-wrapper']}>
            <img
              className={styles.list__image}
              src="https://code.s3.yandex.net/react/code/bun-01.png"
              alt=""
            />
          </div>
          <h3
            className={`text text_type_main-default ml-4 ${styles['list__item-title']}`}>
            Флюоресцентная булка R2-D3
          </h3>
          <span
            className={`text text_type_digits-default ${styles['list__item-price']}`}>
            2 x 20 <CurrencyIcon />
          </span>
        </li>
        <li className={`${styles.list__item} mt-6`}>
          <div className={styles['list__image-wrapper']}>
            <img
              className={styles.list__image}
              src="https://code.s3.yandex.net/react/code/bun-01.png"
              alt=""
            />
          </div>
          <h3
            className={`text text_type_main-default ml-4 ${styles['list__item-title']}`}>
            Флюоресцентная булка R2-D3
          </h3>
          <span
            className={`text text_type_digits-default ${styles['list__item-price']}`}>
            2 x 20 <CurrencyIcon />
          </span>
        </li>
        <li className={`${styles.list__item} mt-6`}>
          <div className={styles['list__image-wrapper']}>
            <img
              className={styles.list__image}
              src="https://code.s3.yandex.net/react/code/bun-01.png"
              alt=""
            />
          </div>
          <h3
            className={`text text_type_main-default ml-4 ${styles['list__item-title']}`}>
            Флюоресцентная булка R2-D3
          </h3>
          <span
            className={`text text_type_digits-default ${styles['list__item-price']}`}>
            2 x 20 <CurrencyIcon />
          </span>
        </li>
        <li className={`${styles.list__item} mt-6`}>
          <div className={styles['list__image-wrapper']}>
            <img
              className={styles.list__image}
              src="https://code.s3.yandex.net/react/code/bun-01.png"
              alt=""
            />
          </div>
          <h3
            className={`text text_type_main-default ml-4 ${styles['list__item-title']}`}>
            Флюоресцентная булка R2-D3
          </h3>
          <span
            className={`text text_type_digits-default ${styles['list__item-price']}`}>
            2 x 20 <CurrencyIcon />
          </span>
        </li>
        <li className={`${styles.list__item} mt-6`}>
          <div className={styles['list__image-wrapper']}>
            <img
              className={styles.list__image}
              src="https://code.s3.yandex.net/react/code/bun-01.png"
              alt=""
            />
          </div>
          <h3
            className={`text text_type_main-default ml-4 ${styles['list__item-title']}`}>
            Флюоресцентная булка R2-D3
          </h3>
          <span
            className={`text text_type_digits-default ${styles['list__item-price']}`}>
            2 x 20 <CurrencyIcon />
          </span>
        </li>
      </ul>
      <div className={styles['item-bottom']}>
        <p className="text text_type_main-default text_color_inactive">
          Вчера, 13:50 i-GMT+3
        </p>
        <span className={`text text_type_digits-default ${styles['item-total-price']}`}>
          510 <CurrencyIcon />
        </span>
      </div>
    </div>
  );
};

export default FeedItemDetails;
