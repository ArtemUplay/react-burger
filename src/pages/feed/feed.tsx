import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import OrderItem from '../../components/order-item/order-item';
import { PATH_FEED } from '../../constants/constants';
import styles from './feed.module.css';
import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_START,
} from '../../services/actions/feed';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../types/hooks';
import { IOrder } from './feed.types';

const Feed = () => {
  const orders = useSelector((store) => store.feed.messages);
  const data = orders.length > 0 ? orders[orders.length - 1].orders : null;
  const dispatch = useDispatch();
  const location = useLocation();
  const linkState = { backgroundFeedLocation: location };
  useEffect(() => {
    dispatch({
      type: WS_FEED_CONNECTION_START,
    });

    return () => {
      dispatch({
        type: WS_FEED_CONNECTION_CLOSED,
      });
    };
  }, [dispatch]);

  return orders.length > 0 ? (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={styles['feed-page']}>
        <ul className={styles.list}>
          {data &&
            data.map((item: IOrder) => {
              return (
                <OrderItem
                  key={item._id}
                  path={`${PATH_FEED}/${item._id}`}
                  item={item}
                  linkState={linkState}
                />
              );
            })}
        </ul>
        <div className={styles['orders-number']}>
          <div className={styles['orders-number__top']}>
            <div className={styles['orders-number__ready']}>
              <p className="text text_type_main-medium mb-6">Готовы:</p>
              <ul className={styles['orders-number__list']}>
                {data &&
                  data
                    .reduce((accumulator: Array<number>, item: IOrder) => {
                      if (item.status === 'done' && accumulator.length < 10) {
                        accumulator.push(item.number);
                      }
                      return accumulator;
                    }, [])
                    .map((number: number) => (
                      <li
                        key={number}
                        className={`${styles['orders-number__list-item_ready']} text text_type_digits-default mb-2`}>
                        {number}
                      </li>
                    ))}
              </ul>
            </div>
            <div className={styles['orders-number__in-work']}>
              <p className="text text_type_main-medium mb-6">В работе:</p>
              <ul className={styles['orders-number__list']}>
                {data &&
                  data.map((item: IOrder) => {
                    return item.status === 'pending' ? (
                      <li
                        key={item._id}
                        className={`${styles['orders-number__list-item']} text text_type_digits-default mb-2`}>
                        034533
                      </li>
                    ) : null;
                  })}
              </ul>
            </div>
          </div>
          <div className="mt-15">
            <p className="text text_type_main-medium">
              Выполнено за все время:
            </p>
            <span className="text text_type_digits-large">
              {orders[0].total}
            </span>
          </div>
          <div className="mt-15">
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <span className="text text_type_digits-large">
              {orders[0].totalToday}
            </span>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default Feed;
