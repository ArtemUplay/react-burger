import React from 'react';
import styles from './product-card.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsPropTypes } from '../utils/utils';

const ProductCard = ({ name, price, image, id, setModalActive, getId }) => {
  return (
    <>
      <li
        id={id}
        className={`pb-8 ${styles.card}`}
        onClick={(evt) => {
          setModalActive(true);
          getId(evt.currentTarget.id);
        }}
      >
        <a className={styles.link} href='#'>
          <img
            className={`mb-1 ml-4 mr-4 ${styles.image}`}
            src={image}
            alt={name}
          />
          <div className={`mb-1 ${styles['price-wrapper']}`}>
            <span className={`mr-2 ${styles.price}`}>{price}</span>
            <CurrencyIcon />
          </div>
          <h3 className={styles.name}>{name}</h3>
        </a>
      </li>
    </>
  );
};

ProductCard.propTypes = ingredientsPropTypes;
ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  setModalActive: PropTypes.func.isRequired,
  getId: PropTypes.func.isRequired,
};

export default ProductCard;
