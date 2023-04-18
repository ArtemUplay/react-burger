import { useMemo, useState } from 'react';
import styles from './product-card.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsPropTypes } from '../utils/utils';
import Modal from '../modal/modal';
import IngredientsDetails from '../ingredient-details/ingredient-details';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

const ProductCard = ({ product }) => {
  const burgerConstructorIngredients = useSelector((store) => store.burgerConstructor.burgerConstructorIngredients);
  const ingredientId = product._id;

  const [countIngredient, setCountIngredient] = useState(0);
  const [modalIngredientsDetailsActive, setModalIngredientsDetailsActive] = useState(false);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ingredientId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useMemo(() => {
    const count = burgerConstructorIngredients.reduce((sum, ingredient) => {
      if (ingredient.type === 'bun' && ingredientId === ingredient._id) {
        return sum + 2;
      } else if (ingredient._id === product._id) {
        return sum + 1;
      } else {
        return sum;
      }
    }, 0);
    setCountIngredient(count);
  }, [product, burgerConstructorIngredients, ingredientId]);

  return (
    <>
      <li
        id={product._id}
        className={`pb-8 ${styles.card}`}
        onClick={() => {
          setModalIngredientsDetailsActive(true);
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
        <Counter count={countIngredient} size="default" />
      </li>
      <Modal
        modalActive={modalIngredientsDetailsActive}
        setModalActive={setModalIngredientsDetailsActive}
        onClose={() => {
          setModalIngredientsDetailsActive(false);
        }}>
        <IngredientsDetails setModalActive={setModalIngredientsDetailsActive} itemId={ingredientId} />
      </Modal>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape(ingredientsPropTypes).isRequired,
};

export default ProductCard;
