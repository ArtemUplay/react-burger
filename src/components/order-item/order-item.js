import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './order-item.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CURRENT_ORDER_DETAILS } from '../../services/actions/order-item-details';

const OrderItem = ({ path, item, linkState }) => {
  const items = useSelector((store) => store.burgerIngredients.items);
  const { name, number, ingredients, createdAt, status } = item;
  const dispatch = useDispatch();

  const orderIngredientsMap = {};
  ingredients.forEach((ingredient) => {
    const foundIngredient = items.find((item) => item._id === ingredient);
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

  const totalPrice = orderIngredients.reduce((sum, item) => {
    return sum + item.ingredient.price * item.count;
  }, 0);

  const onItemClick = () => {
    dispatch({
      type: SET_CURRENT_ORDER_DETAILS,
      currentOrder: item,
    });
  };

  // Сортирую массив с ингредиентами, чтобы булки были на первом месте
  // и отображались только один раз
  const uniqueOrderIngredients = [...new Set(orderIngredients)].sort((a, b) => {
    if (a.type === 'bun') {
      return -1;
    }
    if (b.type === 'bun') {
      return 1;
    }
    return 0;
  });

  return (
    uniqueOrderIngredients.length > 0 && (
      <li className={`${styles.item} p-6`}>
        <Link
          to={path}
          className={styles.item__link}
          onClick={onItemClick}
          state={linkState}>
          <div className={styles.item__top}>
            <span className="text text_type_digits-default">#{number}</span>
            <span className="text text_type_main-default text_color_inactive">
              <FormattedDate date={new Date(createdAt)} />
            </span>
          </div>
          <h3 className="text text_type_main-medium mt-6">{name}</h3>
          <p
            className={`text text_type_main-default mt-2 mb-6 ${
              styles.item__status
            } ${styles.item__status_visible} ${
              status === 'done' ? `${styles.item__status_done}` : ''
            }`}>
            {status === 'done'
              ? 'Выполнен'
              : status === 'created'
              ? 'Создан'
              : 'Готовится'}
          </p>
          <div className={`${styles.item__bottom} mt-6`}>
            <ul className={styles.item__list}>
              {uniqueOrderIngredients.map((item, index) => {
                if (item.ingredient === undefined) {
                  return null;
                }
                if (
                  index > 5 ||
                  (index === uniqueOrderIngredients.length - 1 &&
                    item.ingredient.type === 'bun' &&
                    index !== 0)
                ) {
                  return null;
                }
                return (
                  <li
                    key={`${item.ingredient._id} + ${index}`}
                    style={{ zIndex: 1000 - index }}
                    className={`${styles['item__image-wrapper']} ${
                      index > 0 ? styles['item__image-wrapper_shifted'] : ''
                    }`}>
                    <img
                      className={`${styles.item__image} ${
                        index > 0 ? styles.item__image_shifted : ''
                      }`}
                      src={item.ingredient.image_mobile}
                      alt={item.ingredient.name}
                    />
                    {index === 5 && (
                      <span
                        className={`text text_type_digits-default ${styles.item__overlay}`}>
                        +{uniqueOrderIngredients.length - 5}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
            <span
              className={`${styles.item__price} text text_type_digits-default`}>
              {totalPrice}
              <CurrencyIcon type="primary" />
            </span>
          </div>
        </Link>
      </li>
    )
  );
};

export default OrderItem;
