import { useState, useEffect, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import ProductCard from '../product-card/product-card';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../../services/actions/burger-ingredients';
import { BUN, SAUCE, MAIN } from '../../constants/constants';

const BurgerIngredients = () => {
  const items = useSelector((store) => store.burgerIngredients.items);
  const [current, setCurrent] = useState(BUN);

  const dispatch = useDispatch();

  const tabs = useRef(null);
  const cardsList = useRef(null);
  const bunTitle = useRef(null);
  const sausesTitle = useRef(null);
  const mainTitle = useRef(null);

  useEffect(() => {
    cardsList.current.addEventListener('scroll', () => {
      const bunTitlePosition = bunTitle.current.getBoundingClientRect();
      const sausesTitlePosition = sausesTitle.current.getBoundingClientRect();
      const mainTitlePosition = mainTitle.current.getBoundingClientRect();

      if (tabs.current.clientTop < bunTitlePosition.top) {
        setCurrent(BUN);
      } else if (tabs.current.clientTop < sausesTitlePosition.top) {
        setCurrent(SAUCE);
      } else if (tabs.current.clientTop < mainTitlePosition.top) {
        setCurrent(MAIN);
      }
    });
  }, []);

  return (
    <section className={`pt-10 pb-10 ${styles.menu}`}>
      <h1 className={`mb-5 ${styles['main-title']}`}>Соберите бургер</h1>
      <div ref={tabs} className={`mb-10 ${styles.tabs} tabs`}>
        <a href="#buns" className={styles['tab-link']}>
          <Tab value={BUN} active={current === BUN} onClick={() => setCurrent(BUN)}>
            Булки
          </Tab>
        </a>
        <a href="#sauces" className={styles['tab-link']}>
          <Tab value={SAUCE} active={current === SAUCE} onClick={() => setCurrent(SAUCE)}>
            Соусы
          </Tab>
        </a>
        <a href="#main" className={styles['tab-link']}>
          <Tab value={MAIN} active={current === MAIN} onClick={() => setCurrent(MAIN)}>
            Начинки
          </Tab>
        </a>
      </div>

      <div ref={cardsList} className={`${styles.cards} cards`}>
        <h2 ref={bunTitle} id="buns" className={`mb-6 ${styles.title}`}>
          Булки
        </h2>
        <ul className={`pb-10 ${styles.list}`}>
          {items.map((product) => {
            if (product.type === BUN) {
              return <ProductCard product={product} key={product._id} />;
            } else {
              return null;
            }
          })}
        </ul>
        <h2 ref={sausesTitle} id="sauces" className={`mb-6 ${styles.title}`}>
          Соусы
        </h2>
        <ul className={styles.list}>
          {items.map((product) => {
            if (product.type === SAUCE) {
              return <ProductCard product={product} key={product._id} />;
            } else {
              return null;
            }
          })}
        </ul>
        <h2 ref={mainTitle} id="main" className={`mb-6 ${styles.title}`}>
          Начинки
        </h2>
        <ul className={styles.list}>
          {items.map((product) => {
            if (product.type === MAIN) {
              return <ProductCard key={product._id} product={product} />;
            } else {
              return null;
            }
          })}
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngredients;
