import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={styles.list__item}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
              <a href="#" className={`pl-2 pr-5 pb-4 pt-4 mr-2 ${`${styles.link}`}`}>
                <BurgerIcon type="primary" />
                <span className="ml-2">Конструктор</span>
              </a>
            </li>
            <li className="list__item">
              {/* Линтер отключен у следующей ссылки, так как на данном стадии проекта у нас нет контента, куда будет вести эта ссылка */}
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" className={`pl-5 pr-5 pb-4 pt-4 ${`${styles.link} ${styles.link_disabled}`}`}>
                <ListIcon type="primary" />
                <span className="ml-2">Лента заказов</span>
              </a>
            </li>
          </ul>
          {/* Линтер отключен у следующей ссылки, так как на данном стадии проекта у нас нет контента, куда будет вести эта ссылка */}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={styles['logo-link']} href="#">
            <Logo />
          </a>
          {/* Линтер отключен у следующей ссылки, так как на данном стадии проекта у нас нет контента, куда будет вести эта ссылка */}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            href="#"
            className={`pl-5 pr-4 pb-4 pt-5 ${`${styles.link} ${styles.link_disabled}`} ${styles['personal-account']}`}>
            <ProfileIcon type="primary" />
            <span className="ml-2">Личный кабинет</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
