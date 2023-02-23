import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={styles.list__item}>
              <a href="#" className={`pl-2 pr-5 pb-4 pt-4 mr-2 ${styles.link}`}>
                <BurgerIcon type="primary" />
                <span className="ml-2">Конструктор</span></a>
            </li>
            <li className="list__item">
              <a href="#" className={`pl-5 pr-5 pb-4 pt-4 ${styles.link}`}>
                <ListIcon type="primary" />
                <span className="ml-2">Лента заказов</span></a>
            </li>
          </ul>
          <Logo />
          <a href="#" className={`pl-5 pr-4 pb-4 pt-5 ${styles.link} ${styles['personal-account']}`}>
            <ProfileIcon type="primary" />
            <span className="ml-2">Личный кабинет</span></a>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;