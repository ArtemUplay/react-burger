import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles['constructor-page']}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </main>
    </div>
  );
}

export default App;
