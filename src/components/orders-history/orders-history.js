import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderItem from '../order-item/order-item';
import styles from './orders-history.module.css';
import { PATH_PROFILE_ORDERS } from '../../constants/constants';
import {
  WS_ORDERS_HISTORY_CONNECTION_CLOSED,
  WS_ORDERS_HISTORY_CONNECTION_START,
} from '../../services/actions/orders-history';

const OrdersHistory = () => {
  const { accessToken } = useSelector((store) => store.profile);
  const orders = useSelector((store) => store.ordersHistory.messages);
  const dispatch = useDispatch();

  const data = orders.length > 0 ? orders[orders.length - 1].orders : null;

  useEffect(() => {
    if (accessToken) {
      dispatch({
        type: WS_ORDERS_HISTORY_CONNECTION_START,
        accessToken: accessToken,
      });

      return () => dispatch({ type: WS_ORDERS_HISTORY_CONNECTION_CLOSED });
    }
  }, [dispatch]);

  const reversedData = data && data.length > 0 ? [...data].reverse() : null;

  return (
    reversedData &&
    reversedData.length > 0 && (
      <ul className={styles.list}>
        {reversedData.map((item) => {
          return (
            <OrderItem
              path={`${PATH_PROFILE_ORDERS}/${item._id}`}
              key={item._id}
              name={item.name}
              number={item.number}
              ingredients={item.ingredients}
              date={item.createdAt}
              item={item}
            />
          );
        })}
      </ul>
    )
  );
};

export default OrdersHistory;
