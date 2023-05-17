import FeedItem from '../../components/feed-item/feed-item';
import styles from './feed.module.css';

const Feed = () => {
  const data = [{}];

  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={styles['feed-page']}>
        <ul className={styles.list}>
          <FeedItem />
          <FeedItem />
          <FeedItem />
          <FeedItem />
          <FeedItem />
        </ul>
        <div className={styles['orders-number']}>
          <div className={styles['orders-number__top']}>
            <div className={styles['orders-number__ready']}>
              <p className="text text_type_main-medium mb-6">Готовы:</p>
              <ul className={styles['orders-number__list']}>
                <li
                  className={`${styles['orders-number__list-item_ready']} text text_type_digits-default mb-2`}>
                  034533
                </li>
                <li
                  className={`${styles['orders-number__list-item_ready']} text text_type_digits-default mb-2`}>
                  034532
                </li>
                <li
                  className={`${styles['orders-number__list-item_ready']} text text_type_digits-default mb-2`}>
                  034530
                </li>
                <li
                  className={`${styles['orders-number__list-item_ready']} text text_type_digits-default mb-2`}>
                  034527
                </li>
                <li
                  className={`${styles['orders-number__list-item_ready']} text text_type_digits-default mb-2`}>
                  034525
                </li>
              </ul>
            </div>
            <div className={styles['orders-number__in-work']}>
              <p className="text text_type_main-medium mb-6">В работе:</p>
              <ul className={styles['orders-number__list']}>
                <li
                  className={`${styles['orders-number__list-item']} text text_type_digits-default mb-2`}>
                  034533
                </li>
                <li
                  className={`${styles['orders-number__list-item']} text text_type_digits-default mb-2`}>
                  034532
                </li>
                <li
                  className={`${styles['orders-number__list-item']} text text_type_digits-default mb-2`}>
                  034530
                </li>
                <li
                  className={`${styles['orders-number__list-item']} text text_type_digits-default mb-2`}>
                  034527
                </li>
                <li
                  className={`${styles['orders-number__list-item']} text text_type_digits-default mb-2`}>
                  034525
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-15">
            <p className="text text_type_main-medium">
              Выполнено за все время:
            </p>
            <span className="text text_type_digits-large">28 752</span>
          </div>
          <div className="mt-15">
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <span className="text text_type_digits-large">138</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
