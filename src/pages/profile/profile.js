import styles from './profile.module.css';

import { NavLink, Route, Routes } from 'react-router-dom';
import {
  PATH_CONSTRUCTOR_PAGE,
  PATH_ORDERS,
  PATH_PROFILE_PAGE,
} from '../../constants/constants';
import ProfileForm from '../../components/profile-form/profile-form';
import { logOutProfile } from '../../services/actions/profile';
import { useDispatch } from 'react-redux';
import { getCookie } from '../../components/utils/utils';

const Profile = () => {
  const dispatch = useDispatch();
  const refreshToken = getCookie('refreshToken');

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
              to={PATH_CONSTRUCTOR_PAGE}
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }>
              Выход
            </NavLink>
          </li>
        </ul>
        <p className={`text text_type_main-default ${styles.text}`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <Routes>
        <Route path="/" element={<ProfileForm />} />
        <Route path={PATH_ORDERS} element={<p>Заказы</p>} />
      </Routes>
    </div>
  );
};

export default Profile;
