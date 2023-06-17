import { useMemo } from 'react';
import styles from './burger-constructor.module.css';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { setIngredientToConstructor } from '../../services/actions/burger-constructor';
import {
  DELETE_ORDER_NUMBER,
  getOrderNumber,
} from '../../services/actions/order-details';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import { PATH_LOGIN_PAGE } from '../../constants/constants';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from '../../types/hooks';
import { IIngredient } from '../burger-ingredients/burger-ingredients.types';
import { IIBurgerConstructorIngredient } from './burger-constructor.types';
import Loader from '../loader/loader';

const BurgerConstructor = () => {
  const burgerConstructorIngredients = useSelector(
    (store) => store.burgerConstructor.burgerConstructorIngredients
  );
  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );
  const { accessToken } = useSelector((store) => store.profile);
  const { orderNumberRequest } = useSelector((store) => store.orderDetails);
  const orderNumber = useSelector(
    (store) => store.orderDetails.order.orderNumber
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bun = burgerConstructorIngredients.find(
    (item: IIngredient) => item.type === 'bun'
  );

  const [{ isOver }, dropRef] = useDrop({
    accept: 'ingredient',
    drop: (item: { ingredientId: string; ingredientType: string }) => {
      if (
        burgerConstructorIngredients.length === 0 &&
        item.ingredientType !== 'bun'
      ) {
        return;
      }

      dispatch(setIngredientToConstructor(item.ingredientId, ingredients));
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const totalPrice = useMemo(() => {
    return burgerConstructorIngredients.reduce(
      (sum: number, item: IIBurgerConstructorIngredient) => {
        if (item.type === 'bun') {
          return sum + item.price * 2;
        }

        return sum + item.price;
      },
      0
    );
  }, [burgerConstructorIngredients]);

  function onClickSubmitButton(
    accessToken: string | null,
    burgerConstructorIngredients: Array<IIBurgerConstructorIngredient>
  ) {
    if (accessToken && burgerConstructorIngredients.length > 0) {
      dispatch(getOrderNumber(burgerConstructorIngredients, accessToken));
    } else {
      navigate(PATH_LOGIN_PAGE);
    }
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
              .filter(
                (item: IIBurgerConstructorIngredient) => item.type !== 'bun'
              )
              .map((item: IIBurgerConstructorIngredient) => {
                return (
                  <BurgerConstructorItem
                    key={item.uniqueId + item._id}
                    uniqueId={item.uniqueId}
                    item={item}
                  />
                );
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
          {orderNumberRequest && (
            <div className={styles.loader}>
              <Loader text="Ваш бургер готовится. Пожалуйста, подождите..." />
            </div>
          )}
        </div>
        <div className={`mt-10 ${styles['submit-order-wrapper']}`}>
          <div className={`${styles['wrapper-total-price']}`}>
            <span className={styles['total-price']}>
              {totalPrice ? totalPrice : 0}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          <button
            className={`pt-5 pb-5 pr-10 pl-10 ${styles['submit-order']} ${
              burgerConstructorIngredients.length === 0 || orderNumberRequest
                ? styles['submit-order_disabled']
                : ''
            }`}
            onClick={() =>
              onClickSubmitButton(accessToken, burgerConstructorIngredients)
            }
            disabled={!!!burgerConstructorIngredients}>
            Оформить заказ
          </button>
        </div>
      </section>
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
  );
};

export default BurgerConstructor;
