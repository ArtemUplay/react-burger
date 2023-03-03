import ConstructorItems from "../constructor-item/constructor-item";
import styles from './burger-constructor.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { LockIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

// TODO: переделать высоту контейнера со скроллом
// TODO: Узнать почему key одинаковый у каких-то элементов

const BurgerConstructor = ({ dataArray, price, countTotalPrice }) => {

  React.useEffect(() => {

  }, [])

  // const [totalPrice, countTotalPrice] = React.useState(price);
  const bun = dataArray.find(item => item.type === 'bun');

  // React.useEffect(() => {
  //   if (bun) {
  //     countTotalPrice(price + bun.price * 2);
  //   }
  // }, [price])

  return (
    <section className={`pt-25 ${styles.section}`}>
      <ul className={`${styles.list}`}>
        {
          bun ? (
            <div className={`mb-4 mr-4 ${styles['item-wrapper']}`}>
              <li className={`pt-4 pb-4 pl-6 pr-8 ${styles.item} ${styles['first-item']}`}>
                <a className={`${styles.link}`} href='#'>
                  <img className={`mr-5 ${styles.image}`} src={bun.image} alt={bun.name} />
                  <h3 className={`mr-5 ${styles['item-name']}`}>{bun.name}</h3>
                  <div className={`mr-5 ${styles['price-wrapper']}`}>
                    <span className={`${styles.price}`}>{bun.price}</span>
                    <CurrencyIcon />
                  </div>
                  <button className={`${styles['lock-button']}`}>
                    <LockIcon type="primary" />
                  </button>
                </a>
              </li>
            </div >
          ) : null
        }
        <div className={`pr-2 ${styles['main-items']}`}>
          {dataArray.map(item => {
            if (item.type !== 'bun') {
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
          {
            bun ? (
              <li className={`pt-4 pb-4 pl-6 pr-8 ${styles.item} ${styles['last-item']}`}>
                <a className={`${styles.link}`} href='#'>
                  <img className={`mr-5 ${styles.image}`} src={bun.image} alt={bun.name} />
                  <h3 className={`mr-5 ${styles['item-name']}`}>{bun.name}</h3>
                  <div className={`mr-5 ${styles['price-wrapper']}`}>
                    <span className={`${styles.price}`}>{bun.price}</span>
                    <CurrencyIcon />
                  </div>
                  <button className={`${styles['lock-button']}`}>
                    <LockIcon type="primary" />
                  </button>
                </a>
              </li>
            ) : null
          }
        </div >
      </ul>
      <div className={`mt-10 ${styles['submit-order-wrapper']}`}>
        <div className={`${styles['wrapper-total-price']}`}>
          <span className={styles['total-price']}>{price}</span>
          <CurrencyIcon />
        </div>
        <button className={`pt-5 pb-5 pr-10 pl-10 ${styles['submit-order']}`}>Оформить заказ</button>
      </div>
    </section>
  );
}

export default BurgerConstructor;