import styles from './profile.module.css';

import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  PATH_LOGIN_PAGE,
  PATH_ORDERS,
  PATH_ORDERS_ID,
  PATH_PROFILE_PAGE,
} from '../../constants/constants';
import ProfileForm from '../../components/profile-form/profile-form';
import { logOutProfile } from '../../services/actions/profile';
import { useDispatch } from 'react-redux';
import OrdersHistory from '../../components/orders-history/orders-history';
import Modal from '../../components/modal/modal';
import OrderItemHistoryDetails from '../../components/order-item-history-details/order-item-history-details';

const Profile = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem('refreshToken');

  const logOut = (refreshToken) => {
    dispatch(logOutProfile(refreshToken));
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <ul className={styles.list}>
          <li
            className={`text text_type_main-medium text_color_inactive ${styles.list__item}`}>
            <NavLink
              to={PATH_PROFILE_PAGE}
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
              end>
              Профиль
            </NavLink>
          </li>
          <li
            className={`text text_type_main-medium text_color_inactive ${styles.list__item}`}>
            <NavLink
              to={PATH_ORDERS}
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }>
              История заказов
            </NavLink>
          </li>
          <li
            className={`text text_type_main-medium text_color_inactive ${styles.list__item}`}>
            <NavLink
              onClick={() => logOut(refreshToken)}
              to={PATH_LOGIN_PAGE}
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }>
              Выход
            </NavLink>
          </li>
        </ul>
        <p className={`text text_type_main-default ${styles.text}`}>
          {location.pathname === PATH_PROFILE_PAGE
            ? 'В этом разделе вы можете изменить свои персональные данные'
            : 'В этом разделе вы можете просмотреть свою историю заказов'}
        </p>
      </div>
      <Routes>
        <Route path="/" element={<ProfileForm />} />
        <Route path={PATH_ORDERS} element={<OrdersHistory />} />
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
    </div>
  );
};

export default Profile;
