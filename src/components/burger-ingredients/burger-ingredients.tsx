import { useState, useEffect, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BUN, SAUCE, MAIN } from '../../constants/constants';
import { useSelector } from '../../types/hooks';
import { IIngredient } from './burger-ingredients.types';
import IngredientCard from '../ingredient-card/ingredient-card';

const BurgerIngredients = () => {
  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );
  const [current, setCurrent] = useState(BUN);

  const tabs = useRef<HTMLDivElement>(null);
  const cardsList = useRef<HTMLDivElement>(null);
  const bunTitle = useRef<HTMLHeadingElement>(null);
  const sausesTitle = useRef<HTMLHeadingElement>(null);
  const mainTitle = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (cardsList.current)
      cardsList.current.addEventListener('scroll', () => {
        if (
          bunTitle.current &&
          sausesTitle.current &&
          mainTitle.current &&
          tabs.current
        ) {
          const bunTitlePosition = bunTitle.current.getBoundingClientRect();
          const sausesTitlePosition =
            sausesTitle.current.getBoundingClientRect();
          const mainTitlePosition = mainTitle.current.getBoundingClientRect();

          if (tabs.current.clientTop < bunTitlePosition.top) {
            setCurrent(BUN);
          } else if (tabs.current.clientTop < sausesTitlePosition.top) {
            setCurrent(SAUCE);
          } else if (tabs.current.clientTop < mainTitlePosition.top) {
            setCurrent(MAIN);
          }
        }
      });
  }, []);

  return (
    <section className={`pt-10 pb-10 ${styles.menu}`}>
      <h1 className={`mb-5 ${styles['main-title']}`}>Соберите бургер</h1>
      <div ref={tabs} className={`mb-10 ${styles.tabs} tabs`}>
        <a href="#buns" className={styles['tab-link']}>
          <Tab
            value={BUN}
            active={current === BUN}
            onClick={() => setCurrent(BUN)}>
            Булки
          </Tab>
        </a>
        <a href="#sauces" className={styles['tab-link']}>
          <Tab
            value={SAUCE}
            active={current === SAUCE}
            onClick={() => setCurrent(SAUCE)}>
            Соусы
          </Tab>
        </a>
        <a href="#main" className={styles['tab-link']}>
          <Tab
            value={MAIN}
            active={current === MAIN}
            onClick={() => setCurrent(MAIN)}>
            Начинки
          </Tab>
        </a>
      </div>

      <div ref={cardsList} className={`${styles.cards} cards`}>
        <h2 ref={bunTitle} id="buns" className={`mb-6 ${styles.title}`}>
          Булки
        </h2>
        <ul className={`pb-10 ${styles.list}`}>
          {ingredients.map((ingredient: IIngredient) => {
            if (ingredient.type === BUN) {
              return (
                <IngredientCard ingredient={ingredient} key={ingredient._id} />
              );
            } else {
              return null;
            }
          })}
        </ul>
        <h2 ref={sausesTitle} id="sauces" className={`mb-6 ${styles.title}`}>
          Соусы
        </h2>
        <ul className={styles.list}>
          {ingredients.map((ingredient: IIngredient) => {
            if (ingredient.type === SAUCE) {
              return (
                <IngredientCard ingredient={ingredient} key={ingredient._id} />
              );
            } else {
              return null;
            }
          })}
        </ul>
        <h2 ref={mainTitle} id="main" className={`mb-6 ${styles.title}`}>
          Начинки
        </h2>
        <ul className={styles.list}>
          {ingredients.map((ingredient: IIngredient) => {
            if (ingredient.type === MAIN) {
              return (
                <IngredientCard key={ingredient._id} ingredient={ingredient} />
              );
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
