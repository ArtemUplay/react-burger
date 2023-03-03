import React from 'react'
import styles from './product-card.module.css';
import PropTypes from 'prop-types';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const ProductCard = ({ name, price, image, id, setOpenModal, getId }) => {
  return (
    <>
      <li id={id} className={`pb-8 ${styles.card}`} onClick={(evt) => { setOpenModal(true); getId(evt.currentTarget.id) }}>
        <a className={styles.link} href='#'>
          <img className={`mb-1 ml-4 mr-4 ${styles.image}`} src={image} alt={name} />
          <div className={`mb-1 ${styles['price-wrapper']}`}>
            <span className={`mr-2 ${styles.price}`}>{price}</span>
            <CurrencyIcon />
          </div>
          <h3 className={styles.name}>{name}</h3>
        </a>
      </li>
    </>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string
}

export default ProductCard;