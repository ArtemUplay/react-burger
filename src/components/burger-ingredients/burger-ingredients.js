import React from 'react';
import styles from './burger-ingredients.module.css';
import ProductCard from '../product-card/product-card';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../modal/modal';
import IngredientsDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../utils/utils';

const BurgerIngredients = ({ dataArray, modalIngredientsDetailsActive, setModalIngredientsDetailsActive, getId, itemId }) => {
  const [current, setCurrent] = React.useState('Булки');

  return (
    <>
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
                  <ProductCard key={product._id} name={product.name} price={product.price} image={product.image} id={product._id} setModalActive={setModalIngredientsDetailsActive} getId={getId} />
                );
              }
            })}
          </ul>
          <h2 id='sauces' className={`mb-6 ${styles.title}`}>Соусы</h2>
          <ul className={styles.list}>
            {dataArray.map(product => {
              if (product.type === "sauce") {
                return (
                  <ProductCard key={product._id} name={product.name} price={product.price} image={product.image} id={product._id} setModalActive={setModalIngredientsDetailsActive} getId={getId} />
                );
              }
            })}
          </ul>
          <h2 id='main' className={`mb-6 ${styles.title}`}>Начинки</h2>
          <ul className={styles.list}>
            {dataArray.map(product => {
              if (product.type === 'main') {
                return (
                  <ProductCard key={product._id} name={product.name} price={product.price} image={product.image} id={product._id} setModalActive={setModalIngredientsDetailsActive} getId={getId} />
                );
              }
            })}
          </ul>
        </div>
      </section >
      <>
        <Modal modalActive={modalIngredientsDetailsActive} setModalActive={setModalIngredientsDetailsActive} onClose={() => { setModalIngredientsDetailsActive(false) }}>
          <IngredientsDetails setModalActive={setModalIngredientsDetailsActive} itemId={itemId} dataArray={dataArray} />
        </Modal>
      </>
    </>
  );
}

BurgerIngredients.propTypes = {
  dataArray: PropTypes.arrayOf(PropTypes.shape(ingredientsPropTypes)).isRequired,
  modalIngredientsDetailsActive: PropTypes.bool.isRequired,
  setModalIngredientsDetailsActive: PropTypes.func.isRequired,
  getId: PropTypes.func.isRequired,
  itemId: PropTypes.string
}

export default BurgerIngredients;