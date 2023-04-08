import { useContext, useState, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import PropTypes from 'prop-types';
import { checkResponse } from '../utils/utils';
import { IngredientsContext } from '../../services/ingredientsContext';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({ modalOrderDetailsActive, setModalOrderDetailsActive }) => {
  const ingredientsArray = useContext(IngredientsContext);
  const bun = ingredientsArray.find((item) => item.type === 'bun');
  const URL = 'https://norma.nomoreparties.space/api/orders';
  const ingredients = ingredientsArray.filter((item) => item.type !== 'bun');

  // Создаём стейт, в который мы положим тело ответа от сервера и затем передадим в попап OrderDetails
  const [orderData, setOrderData] = useState();

  const newTotalPrice = useMemo(() => {
    if (!bun) return 0;

    return bun.price * 2 + ingredients.reduce((sum, item) => sum + item.price, 0);
  }, [bun, ingredients]);

  async function postOrder() {
    const ingredientsIds = [bun._id, ...ingredients.map((item) => item._id), bun._id];

    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: ingredientsIds,
      }),
    });

    const data = await checkResponse(response);

    setOrderData(data);
  }

  async function postOrder() {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: ingredients,
      }),
    });

    const data = await checkResponse(response);

    setOrderData(data);
  }

  function onClickSubmitButton() {
    postOrder();
    setModalOrderDetailsActive(true);

    console.log('Я функция onClick');
  }

  return (
    <>
      <section className={`pt-25 ${styles.section}`}>
        <div className={`${styles.list}`}>
          <div key={1} className={`mb-4 mr-4 ${styles['item-wrapper']}`}>
            {bun ? (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            ) : null}
          </div>
          <div className={`pr-2 ${styles['main-items']}`}>
            {ingredientsArray
              .filter((item) => item.type !== 'bun')
              .map((item) => (
                <div key={item._id} className={`mb-4 ${styles['item-wrapper']}`}>
                  <DragIcon type="primary" />
                  <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
                </div>
              ))}
          </div>
          <div key={2} className={`mt-4 mr-4 ${styles['item-wrapper']}`}>
            {bun ? (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            ) : null}
          </div>
        </div>
        <div className={`mt-10 ${styles['submit-order-wrapper']}`}>
          <div className={`${styles['wrapper-total-price']}`}>
            <span className={styles['total-price']}>{newTotalPrice}</span>
            <CurrencyIcon />
          </div>
          <button className={`pt-5 pb-5 pr-10 pl-10 ${styles['submit-order']}`} onClick={onClickSubmitButton}>
            Оформить заказ
          </button>
        </div>
      </section>
      <>
        <Modal
          modalActive={modalOrderDetailsActive}
          setModalActive={setModalOrderDetailsActive}
          onClose={() => {
            setModalOrderDetailsActive(false);
          }}>
          <OrderDetails setModalActive={setModalOrderDetailsActive} orderData={orderData} />
        </Modal>
      </>
    </>
  );
};

BurgerConstructor.propTypes = {
  modalOrderDetailsActive: PropTypes.bool.isRequired,
  setModalOrderDetailsActive: PropTypes.func.isRequired,
};

export default BurgerConstructor;
