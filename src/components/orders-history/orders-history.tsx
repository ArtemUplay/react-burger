import { useEffect } from 'react';
import OrderItem from '../order-item/order-item';
import styles from './orders-history.module.css';
import { PATH_PROFILE_ORDERS } from '../../constants/constants';
import {
  WS_ORDERS_HISTORY_CONNECTION_CLOSED,
  WS_ORDERS_HISTORY_CONNECTION_START,
} from '../../services/actions/orders-history';
import { useLocation } from 'react-router-dom';
import ProfileNavigationMenu from '../profile-navigation-menu/profile-navigation-menu';
import { useDispatch, useSelector } from '../../types/hooks';

const OrdersHistory = () => {
  const { accessToken } = useSelector((store) => store.profile);
  const orders = useSelector((store) => store.ordersHistory.messages);
  const dispatch = useDispatch();
  const location = useLocation();
  const linkState = { backgroundOrdersHistoryLocation: location };

  const data = orders?.length > 0 ? orders[orders.length - 1].orders : null;

  useEffect(() => {
    if (accessToken) {
      dispatch({
        type: WS_ORDERS_HISTORY_CONNECTION_START,
        accessToken: accessToken,
      });

      return () => {
        dispatch({ type: WS_ORDERS_HISTORY_CONNECTION_CLOSED });
      };
    }
  }, [dispatch, accessToken]);

  const reversedData = data && data.length > 0 ? [...data].reverse() : null;

  return reversedData && reversedData.length > 0 ? (
    <>
      <ProfileNavigationMenu />
      <ul className={styles.list}>
        {reversedData.map((item) => {
          return (
            <OrderItem
              path={`${PATH_PROFILE_ORDERS}/${item._id}`}
              key={item._id}
              item={item}
              linkState={linkState}
            />
          );
        })}
      </ul>
    </>
  ) : null;
};

export default OrdersHistory;
