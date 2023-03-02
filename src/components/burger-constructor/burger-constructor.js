import ConstructorItems from "../constructor-item/constructor-item";
import data from '../utils/data.json';
import styles from './burger-constructor.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { LockIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// TODO: переделать высоту контейнера со скроллом

const BurgerConstructor = () => {
  const bun = data.find(item => item.type === 'bun');
  let totalPrice = 0;
  totalPrice = bun.price * 2;

  return (
    <section className={`pt-25`}>
      <ul className={`${styles.list}`}>
        <div className={`mb-4 mr-4 ${styles['item-wrapper']}`}>
          <li className={`pt-4 pb-4 pl-6 pr-8 ${styles.item} ${styles['first-item']}`} key={bun._id}>
            <a className={`${styles.link}`} href='#'>
              <img className={`mr-5 ${styles.image}`} src={bun.image} alt={bun.name} />
              <h3 className={`mr-5 ${styles['item-name']}`}>{`${bun.name} (вверх)`}</h3>
              <div className={`mr-5 ${styles['price-wrapper']}`}>
                <span className={`${styles.price}`}>{bun.price}</span>
                <CurrencyIcon type="primary" />
              </div>
              <button className={`${styles['lock-button']}`}>
                <LockIcon type="primary" />
              </button>
            </a>
          </li>
        </div >
        <div className={`pr-2 ${styles['main-items']}`}>
          {data.map(item => {
            if (item.type !== 'bun') {
              totalPrice = item.price + totalPrice;
              return (
                <div className={`mb-4 ${styles['item-wrapper']}`}>
                  <DragIcon type="primary" />
                  <ConstructorItems key={item._id} image={item.image} name={item.name} price={item.price} />
                </div>
              )
            }
          })}
        </div >
        <div className={`mt-4 mr-4 ${styles['item-wrapper']}`}>
          <li className={`pt-4 pb-4 pl-6 pr-8 ${styles.item} ${styles['last-item']}`} key={bun._id}>
            <a className={`${styles.link}`} href='#'>
              <img className={`mr-5 ${styles.image}`} src={bun.image} alt={bun.name} />
              <h3 className={`mr-5 ${styles['item-name']}`}>{`${bun.name} (низ)`}</h3>
              <div className={`mr-5 ${styles['price-wrapper']}`}>
                <span className={`${styles.price}`}>{bun.price}</span>
                <CurrencyIcon type="primary" />
              </div>
              <button className={`${styles['lock-button']}`}>
                <LockIcon type="primary" />
              </button>
            </a>
          </li>
        </div >
      </ul>
      <div className={`mt-10 ${styles['submit-order-wrapper']}`}>
        <div className={`${styles['wrapper-total-price']}`}>
          <span className={styles['total-price']}>{totalPrice}</span>
          <CurrencyIcon />
        </div>
        <button className={`pt-5 pb-5 pr-10 pl-10 ${styles['submit-order']}`}>Оформить заказ</button>
      </div>
    </section>
  );
}

export default BurgerConstructor;