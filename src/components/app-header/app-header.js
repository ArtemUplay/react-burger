import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import {
  PATH_CONSTRUCTOR_PAGE,
  PATH_FEED,
  PATH_PROFILE_PAGE,
} from '../../constants/constants';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={`${styles.list__item} pl-2 pr-5 pb-4 pt-4 mr-2`}>
              <NavLink
                to={PATH_CONSTRUCTOR_PAGE}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.link} ${styles.link_active}`
                    : styles.link
                }
                end>
                <BurgerIcon type="primary" fill={'#8585AD'} />
                <span className="ml-2">Конструктор</span>
              </NavLink>
            </li>
            <li className="list__item pl-2 pr-5 pb-4 pt-4 mr-2">
              <NavLink
                to={PATH_FEED}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.link} ${styles.link_active}`
                    : styles.link
                }>
                <ListIcon type="primary" />
                <span className="ml-2">Лента заказов</span>
              </NavLink>
            </li>
          </ul>
          <Link to="/" className={styles['logo-link']}>
            <Logo />
          </Link>
          <NavLink
            to={PATH_PROFILE_PAGE}
            className={({ isActive }) =>
              isActive
                ? `pl-5 pr-4 pb-4 pt-5
                ${styles['personal-account']} ${styles.link} ${styles.link_active}`
                : `pl-5 pr-4 pb-4 pt-5
                ${styles['personal-account']} ${styles.link}`
            }>
            <ProfileIcon type="primary" />
            <span className="ml-2">Личный кабинет</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
