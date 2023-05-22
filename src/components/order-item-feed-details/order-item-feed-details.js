import { useSelector } from 'react-redux';
import OrderItemDetails from '../order-item-details/order-item-details';

const OrderItemFeedDetails = () => {
  const orders = useSelector((store) => store.feed.messages);
  return (
    <>
      <OrderItemDetails orders={orders} />
    </>
  );
};

export default OrderItemFeedDetails;
