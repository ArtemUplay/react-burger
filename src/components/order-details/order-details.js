import { done } from '../../images/done.png';

const OrderDetails = () => {
  return (
    <div>
      <h2 className="text text_type_digits-large mt-30 mb-8">034536</h2>
      <p className="text text_type_main-small mb-15">идентификатор заказа</p>
      <img className="mt-15 mb-15" src={done} alt="Галочка" />
      <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails;