import styles from './profile.module.css';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { PATH_ORDERS, PATH_ORDERS_ID } from '../../constants/constants';
import ProfileForm from '../../components/profile-form/profile-form';
import OrdersHistory from '../../components/orders-history/orders-history';
import Modal from '../../components/modal/modal';
import OrderItemHistoryDetails from '../../components/order-item-history-details/order-item-history-details';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location?.state;

  return (
    <div className={`${styles.wrapper}`}>
      <Routes location={state?.backgroundOrdersHistoryLocation || location}>
        <Route path="/" element={<ProfileForm />} />
        <Route path={PATH_ORDERS} element={<OrdersHistory />} />
        <Route path={PATH_ORDERS_ID} element={<OrderItemHistoryDetails />} />
      </Routes>

      {state?.backgroundOrdersHistoryLocation && (
        <Routes>
          <Route
            path={PATH_ORDERS_ID}
            element={
              <Modal
                onClose={() => {
                  navigate(PATH_ORDERS);
                }}>
                <OrderItemHistoryDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default Profile;
