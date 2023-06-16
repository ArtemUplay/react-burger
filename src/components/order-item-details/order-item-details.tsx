import { useEffect } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-item-details.module.css';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SET_CURRENT_ORDER_DETAILS } from '../../services/actions/order-item-details';
import { useSelector } from '../../types/hooks';
import { IOrderItemDetailsProps } from './order-item-details.types';
import { IIngredient } from '../burger-ingredients/burger-ingredients.types';

const OrderItemDetails = ({ orders }: IOrderItemDetailsProps) => {
  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );
  const currentOrder = useSelector(
    (store) => store.orderItemDetails.currentOrder
  );
  const dispatch = useDispatch();

  const { id } = useParams();

  const data = orders.length > 0 ? orders[orders.length - 1].orders : null;
  const currentItem = data?.find((item) => {
    return item._id === id;
  });

  const orderIngredientsMap: Record<
    string,
    { ingredient: IIngredient; count: number }
  > = {};

  currentOrder?.ingredients.forEach((ingredient: string) => {
    const foundIngredient = ingredients.find(
      (item: IIngredient) => item._id === ingredient
    );
    if (foundIngredient) {
      if (foundIngredient.type === 'bun') {
        orderIngredientsMap[ingredient] = {
          ingredient: foundIngredient,
          count: 2,
        };
      } else {
        if (orderIngredientsMap[ingredient]) {
          orderIngredientsMap[ingredient].count += 1;
        } else {
          orderIngredientsMap[ingredient] = {
            ingredient: foundIngredient,
            count: 1,
          };
        }
      }
    }
  });

  const orderIngredients = Object.values(orderIngredientsMap);

  const totalPrice = orderIngredients.reduce((sum: number, item) => {
    return sum + item.ingredient.price * item.count;
  }, 0);

  useEffect(() => {
    dispatch({
      type: SET_CURRENT_ORDER_DETAILS,
      currentOrder: currentItem,
    });
  }, [dispatch, currentItem]);

  return data && data.length > 0 && currentOrder ? (
    <div className={styles.wrapper}>
      <p
        className={`${styles['item-number']} text text_type_digits-default mb-10`}>
        #{currentOrder.number}
      </p>
      <h2 className="text text_type_main-medium mb-3">{currentOrder.name}</h2>
      <p className={`text text_type_main-default ${styles.text_ready} mb-15`}>
        {currentOrder.status === 'done' ? 'Выполнен' : ''}
      </p>
      <span className="text text_type_main-medium mb-6">Состав:</span>
      <ul className={styles.list}>
        {orderIngredients.map((item) => {
          return (
            <li
              key={item.ingredient._id}
              className={`${styles.list__item} mt-6`}>
              <div className={styles['list__image-wrapper']}>
                <img
                  className={styles.list__image}
                  src={item.ingredient.image_mobile}
                  alt={item.ingredient.name}
                />
              </div>
              <h3
                className={`text text_type_main-default ml-4 ${styles['list__item-title']}`}>
                {item.ingredient.name}
              </h3>
              <span
                className={`text text_type_digits-default ${styles['list__item-price']}`}>
                {item.count} x {item.ingredient.price}{' '}
                <CurrencyIcon type="primary" />
              </span>
            </li>
          );
        })}
      </ul>
      <div className={styles['item-bottom']}>
        <p className="text text_type_main-default text_color_inactive">
          Вчера, 13:50 i-GMT+3
        </p>
        <span
          className={`text text_type_digits-default ${styles['item-total-price']}`}>
          {totalPrice}
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </div>
  ) : null;
};

export default OrderItemDetails;
