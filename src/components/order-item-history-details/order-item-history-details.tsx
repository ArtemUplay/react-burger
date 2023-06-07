import { useDispatch } from 'react-redux';
import OrderItemDetails from '../order-item-details/order-item-details';
import { useEffect } from 'react';
import {
  WS_ORDERS_HISTORY_CONNECTION_CLOSED,
  WS_ORDERS_HISTORY_CONNECTION_START,
} from '../../services/actions/orders-history';
import styles from './order-item-history-details.module.css';
import Loader from '../loader/loader';
import { useSelector } from '../../types/hooks';

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

    return () => {
      dispatch({ type: WS_ORDERS_HISTORY_CONNECTION_CLOSED });
    };
  }, [accessToken]);

  if (!orders || orders.length === 0) {
    return (
      <div className={styles.loader}>
        <Loader text="Загрузка... Пожалуйста, подождите" />
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
