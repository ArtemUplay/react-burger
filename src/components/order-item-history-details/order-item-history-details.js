import { useDispatch, useSelector } from 'react-redux';
import OrderItemDetails from '../order-item-details/order-item-details';
import { useEffect } from 'react';
import {
  WS_ORDERS_HISTORY_CONNECTION_CLOSED,
  WS_ORDERS_HISTORY_CONNECTION_START,
} from '../../services/actions/orders-history';
import Loader from 'react-js-loader';
import styles from './order-item-history-details.module.css';

const OrderItemHistoryDetails = () => {
  const orders = useSelector((store) => store.ordersHistory.messages);
  const { accessToken } = useSelector((store) => store.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch({
        type: WS_ORDERS_HISTORY_CONNECTION_START,
        accessToken,
      });
    }

    return () => dispatch({ type: WS_ORDERS_HISTORY_CONNECTION_CLOSED });
  }, [accessToken]);

  if (!orders || orders.length === 0) {
    return (
      <div className={styles.loader}>
        <Loader />
        <p className="text text_type_main-default">
          Загрузка... Пожалуйста, подождите
        </p>
      </div>
    );
  }

  return (
    <>
      <OrderItemDetails orders={orders} />
    </>
  );
};

export default OrderItemHistoryDetails;
