import styles from './product-card.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const ProductCard = ({ _id, name, price, image }) => {
  return (
    <li className={`pb-8 ${styles.card}`} key={_id}>
      <a className={styles.link} href='#'>
        <img className={`mb-1 ml-4 mr-4 ${styles.image}`} src={image} alt={name} />
        <div className={`mb-1 ${styles['price-wrapper']}`}>
          <span className={`mr-2 ${styles.price}`}>{price}</span>
          <CurrencyIcon />
        </div>
        <h3 className={styles.name}>{name}</h3>
      </a>
    </li>
  );
}

export default ProductCard;