import { useState, useEffect, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import ProductCard from '../product-card/product-card';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../../services/actions/burger-ingredients';

const BurgerIngredients = () => {
  const items = useSelector((store) => store.burgerIngredients.items);
  const [current, setCurrent] = useState('Булки');

  const dispatch = useDispatch();

  const tabs = useRef(null);
  const cardsList = useRef(null);
  const bunTitle = useRef(null);
  const sausesTitle = useRef(null);
  const mainTitle = useRef(null);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  useEffect(() => {
    cardsList.current.addEventListener('scroll', () => {
      const bunTitlePosition = bunTitle.current.getBoundingClientRect();
      const sausesTitlePosition = sausesTitle.current.getBoundingClientRect();
      const mainTitlePosition = mainTitle.current.getBoundingClientRect();

      if (tabs.current.clientTop < bunTitlePosition.top) {
        setCurrent('Булки');
      } else if (tabs.current.clientTop < sausesTitlePosition.top) {
        setCurrent('Соусы');
      } else if (tabs.current.clientTop < mainTitlePosition.top) {
        setCurrent('Начинки');
      }
    });
  }, []);


  return (
    <>
      <section className={`pt-10 pb-10 ${styles.menu}`}>
        <h1 className={`mb-5 ${styles['main-title']}`}>Соберите бургер</h1>
        <div ref={tabs} className={`mb-10 ${styles.tabs} tabs`}>
          <a href="#buns" className={styles['tab-link']}>
            <Tab value="Булки" active={current === 'Булки'} onClick={() => setCurrent('Булки')}>
              Булки
            </Tab>
          </a>
          <a href="#sauces" className={styles['tab-link']}>
            <Tab value="Соусы" active={current === 'Соусы'} onClick={() => setCurrent('Соусы')}>
              Соусы
            </Tab>
          </a>
          <a href="#main" className={styles['tab-link']}>
            <Tab value="Начинки" active={current === 'Начинки'} onClick={() => setCurrent('Начинки')}>
              Начинки
            </Tab>
          </a>
        </div>

        <div ref={cardsList} className={`${styles.cards} cards`}>
          <h2 ref={bunTitle} id="buns" className={`mb-6 ${styles.title}`}>
            Булки
          </h2>
          <ul className={`pb-10 ${styles.list}`}>
            {items.map((product, index) => {
              if (product.type === 'bun') {
                return <ProductCard product={product} key={product._id} index={index + Date.now()} />;
              } else {
                return null;
              }
            })}
          </ul>
          <h2 ref={sausesTitle} id="sauces" className={`mb-6 ${styles.title}`}>
            Соусы
          </h2>
          <ul className={styles.list}>
            {items.map((product, index) => {
              if (product.type === 'sauce') {
                return <ProductCard product={product} key={product._id} index={index + Date.now()} />;
              } else {
                return null;
              }
            })}
          </ul>
          <h2 ref={mainTitle} id="main" className={`mb-6 ${styles.title}`}>
            Начинки
          </h2>
          <ul className={styles.list}>
            {items.map((product, index) => {
              if (product.type === 'main') {
                return <ProductCard key={product._id} product={product} index={index + Date.now()} />;
              } else {
                return null;
              }
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default BurgerIngredients;
