import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main>
        <BurgerIngredients />
      </main>
    </div>
  );
}

export default App;
