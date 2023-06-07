import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import OrderItemDetails from '../order-item-details/order-item-details';
import styles from './order-item-feed-details.module.css';
import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_START,
} from '../../services/actions/feed';
import Loader from '../loader/loader';
import { useSelector } from '../../types/hooks';

const OrderItemFeedDetails = () => {
  const orders = useSelector((store) => store.feed.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch({
        type: WS_FEED_CONNECTION_START,
      });
    }

    return () => {
      dispatch({ type: WS_FEED_CONNECTION_CLOSED });
    };
  }, [orders]);

  if (!orders || orders.length === 0) {
    return (
      <div className={styles.loader}>
        <Loader text="Загрузка... Пожалуйста, подождите" />
      </div>
    );
  }
  return <OrderItemDetails orders={orders} />;
};

export default OrderItemFeedDetails;
