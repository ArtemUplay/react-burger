import { useMemo } from 'react';
import styles from './product-card.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsPropTypes } from '../utils/utils';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

const ProductCard = ({ product, setModalActive, index, getId }) => {
  const burgerObject = useSelector((store) => store.burgerConstructor.burgerObject);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...product, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  let countIngredient = 0;

  countIngredient = useMemo(() => {
    if (product.type === 'bun' && burgerObject.bun._id === product._id) {
      return 2;
    } else if (burgerObject.ingredients.length !== 0) {
      return burgerObject.ingredients.filter((ingredient) => ingredient._id === product._id).length;
    }
  }, [product, burgerObject]);

  return (
    <li
      id={product._id}
      className={`pb-8 ${styles.card}`}
      onClick={(evt) => {
        setModalActive(true);
        getId(evt.currentTarget.id);
      }}
      ref={dragRef}
      style={{ backgroundColor: isDragging ? '#24247c' : '' }}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={`${styles.link}`} href="#">
        <img className={`mb-1 ml-4 mr-4 ${styles.image}`} src={product.image} alt={product.name} />
        <div className={`mb-1 ${styles['price-wrapper']}`}>
          <span className={`mr-2 ${styles.price}`}>{product.price}</span>
          <CurrencyIcon />
        </div>
        <h3 className={styles.name}>{product.name}</h3>
      </a>
      <Counter count={countIngredient} size="default" extraClass={`${!countIngredient ? styles.hidden : ''}`} />
    </li>
  );
};

// ProductCard.propTypes = ingredientsPropTypes;
// ProductCard.propTypes = {
//   id: PropTypes.string.isRequired,
//   setModalActive: PropTypes.func.isRequired,
//   getId: PropTypes.func.isRequired,
// };

export default ProductCard;
