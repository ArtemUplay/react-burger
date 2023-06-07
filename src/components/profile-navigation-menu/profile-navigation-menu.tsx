import { useDispatch } from 'react-redux';
import {
  PATH_LOGIN_PAGE,
  PATH_PROFILE_ORDERS,
  PATH_PROFILE_PAGE,
} from '../../constants/constants';
import { logOutProfile } from '../../services/actions/profile';
import styles from './profile-navigation-menu.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../../types';

const ProfileNavigationMenu = () => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const refreshToken = localStorage.getItem('refreshToken');
  const location = useLocation();

  const logOut = (refreshToken: string) => {
    dispatch(logOutProfile(refreshToken));
  };

  return (
    <div className={styles['list-wrapper']}>
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
            to={PATH_PROFILE_ORDERS}
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }>
            История заказов
          </NavLink>
        </li>
        <li
          className={`text text_type_main-medium text_color_inactive ${styles.list__item}`}>
          <NavLink
            onClick={() => {
              if (refreshToken) {
                logOut(refreshToken);
              }
            }}
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
  );
};

export default ProfileNavigationMenu;
