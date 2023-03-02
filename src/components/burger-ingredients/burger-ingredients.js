import React from 'react';
import styles from './burger-ingredients.module.css';
import data from '../utils/data.json';
import ProductCard from '../product-card/product-card';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

// TODO: переделать высоту контейнера со скроллом

const BurgerIngredients = ({ dataArray }) => {
  const [current, setCurrent] = React.useState('Булки');

  return (
    <section className={`pt-10 pb-10 ${styles.menu}`}>
      <h1 className={`mb-5 ${styles['main-title']}`}>Соберите бургер</h1>
      <div className={`mb-10 ${styles.tabs}`}>
        <a href='#buns' className={styles['tab-link']}>
          <Tab value='Булки' active={current === 'Булки'} onClick={setCurrent}>
            Булки
          </Tab>
        </a>
        <a href='#sauces' className={styles['tab-link']}>
          <Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
            Соусы
          </Tab>
        </a>
        <a href='#main' className={styles['tab-link']}>
          <Tab value='Начинки' active={current === 'Начинки'} onClick={setCurrent}>
            Начинки
          </Tab>
        </a>
      </div>
      <div className={styles.cards}>
        <h2 id='buns' className={`mb-6 ${styles.title}`}>Булки</h2>
        <ul className={`pb-10 ${styles.list}`}>
          {dataArray.map(product => {
            if (product.type === 'bun') {
              return (
                <ProductCard key={product._id} name={product.name} price={product.price} image={product.image} />
              );
            }
          })}
        </ul>
        <h2 id='sauces' className={`mb-6 ${styles.title}`}>Соусы</h2>
        <ul className={styles.list}>
          {dataArray.map(product => {
            if (product.type === "sauce") {
              return (
                <ProductCard key={product._id} name={product.name} price={product.price} image={product.image} />
              );
            }
          })}
        </ul>
        <h2 id='main' className={`mb-6 ${styles.title}`}>Начинки</h2>
        <ul className={styles.list}>
          {dataArray.map(product => {
            if (product.type === 'main') {
              return (
                <ProductCard key={product._id} name={product.name} price={product.price} image={product.image} />
              );
            }
          })}
        </ul>
      </div>
    </section >
  );
}

export default BurgerIngredients;