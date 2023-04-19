import { useMemo } from 'react';
import styles from './burger-constructor.module.css';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { collectIngredientsInArray } from '../utils/utils';
import { checkResponse } from '../utils/utils';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { setIngredientToConstructor } from '../../services/actions/burger-constructor';
import { DELETE_ORDER_NUMBER, GET_ORDER_NUMBER } from '../../services/actions/order-details';
import { useDrop } from 'react-dnd';
import { URL } from '../../constants/constants';

const BurgerConstructor = () => {
  const burgerConstructorIngredients = useSelector((store) => store.burgerConstructor.burgerConstructorIngredients);
  const items = useSelector((store) => store.burgerIngredients.items);
  const orderNumber = useSelector((store) => store.orderDetails.order.number);

  const dispatch = useDispatch();
  const bun = burgerConstructorIngredients.find((item) => item.type === 'bun');

  const [{ isOver }, dropRef] = useDrop({
    accept: 'ingredient',
    drop: ({ ingredientId }) => {
      dispatch(setIngredientToConstructor(ingredientId, items));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const totalPrice = useMemo(() => {
    return burgerConstructorIngredients.reduce((sum, item) => {
      if (item.type === 'bun') {
        return sum + item.price * 2;
      }

      return sum + item.price;
    }, 0);
  }, [burgerConstructorIngredients]);

  async function postOrder() {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: [...collectIngredientsInArray(burgerConstructorIngredients)],
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
          <ul className={`pr-2 ${styles['main-items']}`} ref={dropRef}>
            {burgerConstructorIngredients
              .filter((item) => item.type !== 'bun')
              .map((item) => {
                return <BurgerConstructorItem key={item.uniqueId + item._id} uniqueId={item.uniqueId} item={item} />;
              })}
          </ul>
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
            <span className={styles['total-price']}>{totalPrice ? totalPrice : 0}</span>
            <CurrencyIcon />
          </div>
          <button className={`pt-5 pb-5 pr-10 pl-10 ${styles['submit-order']}`} onClick={onClickSubmitButton}>
            Оформить заказ
          </button>
        </div>
      </section>
      <>
        {orderNumber && (
          <Modal
            onClose={() => {
              dispatch({
                type: DELETE_ORDER_NUMBER,
              });
            }}>
            <OrderDetails />
          </Modal>
        )}
      </>
    </>
  );
};

export default BurgerConstructor;
