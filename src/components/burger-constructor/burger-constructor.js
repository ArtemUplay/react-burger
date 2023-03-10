import ConstructorItem from "../constructor-item/constructor-item";
import styles from './burger-constructor.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { LockIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../utils/utils';

const BurgerConstructor = ({ dataArray, modalOrderDetailsActive, setModalOrderDetailsActive }) => {

  const bun = dataArray.find(item => item.type === 'bun');

  return (
    <>
      <section className={`pt-25 ${styles.section}`}>
        <div key={1} className={`mb-4 mr-4 ${styles['item-wrapper']}`}>
          {
            bun ? (
              <li className={`pt-4 pb-4 pl-6 pr-8 ${styles.item} ${styles['first-item']}`}>
                <a className={`${styles.link}`} href='#'>
                  <img className={`mr-5 ${styles.image}`} src={bun.image} alt={bun.name} />
                  <h3 className={`mr-5 ${styles['item-name']}`}>{bun.name} (верх)</h3>
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
        </div>
        <ul className={`${styles.list}`}>
          <div className={`pr-2 ${styles['main-items']}`}>
            {dataArray.map(item => {
              if (item.type !== 'bun') {
                return (
                  <div key={item._id} className={`mb-4 ${styles['item-wrapper']}`}>
                    <DragIcon type="primary" />
                    <ConstructorItem image={item.image} name={item.name} price={item.price} />
                  </div>
                )
              }
            })}
          </div>
        </ul>
        <div key={2} className={`mt-4 mr-4 ${styles['item-wrapper']}`}>
          {
            bun ? (
              <li className={`pt-4 pb-4 pl-6 pr-8 ${styles.item} ${styles['last-item']}`}>
                <a className={`${styles.link}`} href='#'>
                  <img className={`mr-5 ${styles.image}`} src={bun.image} alt={bun.name} />
                  <h3 className={`mr-5 ${styles['item-name']}`}>{bun.name} (низ)</h3>
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
        <div className={`mt-10 ${styles['submit-order-wrapper']}`}>
          <div className={`${styles['wrapper-total-price']}`}>
            <span className={styles['total-price']}>10000</span>
            <CurrencyIcon />
          </div>
          <button className={`pt-5 pb-5 pr-10 pl-10 ${styles['submit-order']}`} onClick={() => { setModalOrderDetailsActive(true) }}>Оформить заказ</button>
        </div>
      </section>
      <>
        <Modal modalActive={modalOrderDetailsActive} setModalActive={setModalOrderDetailsActive} onClose={() => { setModalOrderDetailsActive(false) }}>
          <OrderDetails setModalActive={setModalOrderDetailsActive} />
        </Modal>
      </>
    </>
  );
}

BurgerConstructor.propTypes = {
  dataArray: PropTypes.arrayOf(PropTypes.shape(ingredientsPropTypes)).isRequired,
  modalOrderDetailsActive: PropTypes.bool.isRequired,
  setModalOrderDetailsActive: PropTypes.func.isRequired
}

export default BurgerConstructor;

