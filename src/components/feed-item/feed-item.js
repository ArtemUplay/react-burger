import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './feed-item.module.css';

const FeedItem = () => {
  return (
    <li className={`${styles.item} p-6`}>
      <Link to={'/feed/1'} className={styles.item__link}>
        <div className={styles.item__top}>
          <span className="text text_type_digits-default">#034535</span>
          <span className="text text_type_main-default text_color_inactive">
            Сегодня, 16:20 i-GMT+3
          </span>
        </div>
        <h3 className="text text_type_main-medium mt-6">
          Death Star Starship Main бургер
        </h3>
        <div className={`${styles.item__bottom}  mt-6`}>
          <ul className={styles.item__list}>
            {[...new Array(5)].map((_, index) => {
              return (
                <img
                  className={`${styles.item__image} ${
                    index > 0 ? styles.item__image_shifted : ''
                  }`}
                  src="https://mobimg.b-cdn.net/v3/fetch/4a/4af0bcc2b0c34fd573eca9f1be9ab245.jpeg?w=1470&r=0.5625"
                  alt=""
                  style={{ zIndex: 1000 - index }}
                />
              );
            })}
          </ul>
          <span
            className={`${styles.item__price} text text_type_digits-default`}>
            480 <CurrencyIcon type="primary" />
          </span>
        </div>
      </Link>
    </li>
  );
};

export default FeedItem;
