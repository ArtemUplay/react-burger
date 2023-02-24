import React from 'react';
import { useRef } from 'react';
import styles from './burger-ingredients.module.css';
import data from '../../data.json';
import ProductCard from '../product-card/product-card';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('Булки');

  const buns = useRef(null);
  const sauces = useRef(null);
  const main = useRef(null);

  const scrollToElement = (ref) => {
    ref.current.scrollIntoView();
  }

  return (
    <section className={`pt-10 pb-10 ${styles.constructor}`}>
      <h1 className={`mb-5 ${styles['main-title']}`}>Соберите бургер</h1>
      <div className={`mb-10 ${styles.tabs}`}>
        <a className={styles['tab-link']} onClick={() => scrollToElement(buns)}>
          <Tab value='Булки' active={current === 'Булки'} onClick={setCurrent}>
            Булки
          </Tab>
        </a>
        <a className={styles['tab-link']} onClick={() => scrollToElement(sauces)}>
          <Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
            Соусы
          </Tab>
        </a>
        <a className={styles['tab-link']} onClick={() => scrollToElement(main)}>
          <Tab value='Начинки' active={current === 'Начинки'} onClick={setCurrent}>
            Начинки
          </Tab>
        </a>
      </div>
      <div style={{ scrollBehavior: 'smooth' }} className={styles.cards}>
        <h2 ref={buns} className={`mb-6 ${styles.title}`}>Булки</h2>
        <ul className={`pb-10 ${styles.list}`}>
          {data.map(product => {
            if (product.type === 'bun') {
              return (
                <ProductCard _id={product._id} name={product.name} price={product.price} image={product.image} />
              );
            }
          })}
        </ul>
        <h2 ref={sauces} className={`mb-6 ${styles.title}`}>Соусы</h2>
        <ul className={styles.list}>
          {data.map(product => {
            if (product.type === 'sauce') {
              return (
                <ProductCard _id={product._id} name={product.name} price={product.price} image={product.image} />
              );
            }
          })}
        </ul>
        <h2 ref={main} className={`mb-6 ${styles.title}`}>Начинки</h2>
        <ul className={styles.list}>
          {data.map(product => {
            if (product.type === 'main') {
              return (
                <ProductCard _id={product._id} name={product.name} price={product.price} image={product.image} />
              );
            }
          })}
        </ul>
      </div>
    </section >
  );
}

export default BurgerIngredients;