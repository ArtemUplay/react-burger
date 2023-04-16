import { useState, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { checkResponse } from '../utils/utils';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  SET_CONSTRUCTOR_BUN,
  SET_CONSTRUCTOR_INGRIDIENT,
  DELETE_CONSTRUCTOR_INGREDIENT,
} from '../../services/actions/burger-constructor';
import { GET_ORDER_NUMBER } from '../../services/actions/order-details';
import { useDrop } from 'react-dnd';

const BurgerConstructor = () => {
  const burgerObject = useSelector((store) => store.burgerConstructor.burgerObject);
  const [modalOrderDetailsActive, setModalOrderDetailsActive] = useState(false);
  const URL = 'https://norma.nomoreparties.space/api/orders';

  const dispatch = useDispatch();

  const handleDrop = ({ ingredient, index }) => {
    if (Object.keys(burgerObject.bun).length === 0 && ingredient.type !== 'bun') {
      return;
    }

    if (ingredient.type === 'bun') {
      dispatch({
        type: SET_CONSTRUCTOR_BUN,
        bun: { ...ingredient },
      });
    } else {
      dispatch({
        type: SET_CONSTRUCTOR_INGRIDIENT,
        ingredient: { ...ingredient, index },
      });
    }
  };

  const handleDelete = (item, ingredientIndex) => {
    dispatch({ type: DELETE_CONSTRUCTOR_INGREDIENT, id: item._id, ingredientIndex });
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: 'ingredient',
    drop: ({ index, ...ingredient }) => {
      handleDrop({ ingredient, index });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const newTotalPrice = useMemo(() => {
    return burgerObject.bun.price * 2 + burgerObject.ingredients.reduce((sum, item) => sum + item.price, 0);
  }, [burgerObject]);

  async function postOrder() {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: [burgerObject.bun.id, ...burgerObject.ingredients.map((item) => item.id), burgerObject.bun.id],
      }),
    });

    const data = await checkResponse(response);

    dispatch({
      type: GET_ORDER_NUMBER,
      number: data.order.number,
    });
  }

  function onClickSubmitButton() {
    postOrder();
    setModalOrderDetailsActive(true);
  }

  return (
    <>
      <section className={`pt-25 ${styles.section}`}>
        <div
          ref={dropRef}
          className={`${styles.list}`}
          style={{
            outlineStyle: isOver ? 'solid' : '',
          }}>
          <div key={1} className={`mb-4 mr-4 ${styles['item-wrapper']}`}>
            {Object.keys(burgerObject.bun).length !== 0 ? (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${burgerObject.bun.name} (верх)`}
                price={burgerObject.bun.price}
                thumbnail={burgerObject.bun.image}
              />
            ) : null}
          </div>
          <div className={`pr-2 ${styles['main-items']}`} ref={dropRef}>
            {burgerObject.ingredients.length !== 0
              ? burgerObject.ingredients.map((item, index) => {
                  return (
                    <div key={item._id + index} className={`mb-4 ${styles['item-wrapper']}`}>
                      <DragIcon type="primary" />
                      <ConstructorElement
                        isLocked={false}
                        text={`${item.name}`}
                        price={item.price}
                        thumbnail={item.image}
                        handleClose={() => {
                          handleDelete(item, item.index);
                        }}
                      />
                    </div>
                  );
                })
              : null}
          </div>
          <div key={2} className={`mt-4 mr-4 ${styles['item-wrapper']}`}>
            {Object.keys(burgerObject.bun).length !== 0 ? (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${burgerObject.bun.name} (низ)`}
                price={burgerObject.bun.price}
                thumbnail={burgerObject.bun.image}
              />
            ) : null}
          </div>
        </div>
        <div className={`mt-10 ${styles['submit-order-wrapper']}`}>
          <div className={`${styles['wrapper-total-price']}`}>
            <span className={styles['total-price']}>{newTotalPrice ? newTotalPrice : 0}</span>
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
          <OrderDetails setModalActive={setModalOrderDetailsActive} />
        </Modal>
      </>
    </>
  );
};

export default BurgerConstructor;
