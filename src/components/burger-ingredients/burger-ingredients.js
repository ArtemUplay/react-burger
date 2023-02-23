import React from 'react';
import styles from './burger-ingredients.module.css';
import data from '../../data.json';
import ProductCard from '../product-card/product-card';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('Булки');

  return (
    <section>
      <div className={styles.container}>
        <h1>Соберите бургер</h1>
        <div className={styles.tabs}>
          <Tab value='Булки' active={current === 'Булки'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value='Начинки' active={current === 'Начинки'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div>
          <h2>Булки</h2>
          <ul>
            {data.map(product => {
              if (product.type === 'bun') {
                return (
                  <ProductCard _id={product._id} name={product.name} price={product.price} image={product.image} />
                );
              }
            })}
          </ul>
        </div>
      </div >
    </section>
  );
}

export default BurgerIngredients;