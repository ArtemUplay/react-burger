import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import OrderItemDetails from '../order-item-details/order-item-details';
import Loader from 'react-js-loader';
import styles from './order-item-feed-details.module.css';
import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_START,
} from '../../services/actions/feed';

const OrderItemFeedDetails = () => {
  const orders = useSelector((store) => store.feed.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch({
        type: WS_FEED_CONNECTION_START,
      });
    }

    return () => dispatch({ type: WS_FEED_CONNECTION_CLOSED });
  }, [orders]);

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

export default OrderItemFeedDetails;
