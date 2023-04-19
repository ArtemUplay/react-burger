import styles from './order-details.module.css';
import done from '../../images/done.png';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { DELETE_ORDER_NUMBER } from '../../services/actions/order-details';

const OrderDetails = () => {
  const orderNumber = useSelector((store) => store.orderDetails.order.number);
  const dispatch = useDispatch();

  return (
    <div className={`pl-25 pr-25 ${styles.wrapper}`}>
      <button
        className={`${styles.button}`}
        onClick={() => {
          dispatch({
            type: DELETE_ORDER_NUMBER,
          });
        }}>
        <CloseIcon type="primary" />
      </button>
      <h2 className="text text_type_digits-large mt-30 mb-8">{orderNumber}</h2>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img className="mb-15" src={done} alt="Галочка" />
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
