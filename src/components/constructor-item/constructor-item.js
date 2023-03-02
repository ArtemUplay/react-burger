import styles from './constructor-item.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DeleteIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { LockIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const ConstructorItem = ({ image, name, price }) => {

  return (
    <li className={`pt-4 pb-4 pl-6 pr-8 ${styles.item}`}>
      <a className={`${styles.link}`} href='#'>
        <img className={`mr-5 ${styles.image}`} src={image} alt={name} />
        <h3 className={`mr-5 ${styles['item-name']}`}>{name}</h3>
        <div className={`mr-5 ${styles['price-wrapper']}`}>
          <span className={`${styles.price}`}>{price}</span>
          <CurrencyIcon />
        </div>
        <button className={`${styles['delete-button']}`}>
          <DeleteIcon type="primary" />
        </button>
      </a>
    </li>
  );
}

ConstructorItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number
}

export default ConstructorItem;