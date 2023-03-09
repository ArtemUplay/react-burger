import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  const URL = 'https://norma.nomoreparties.space/api/ingredients';

  const [dataArray, setData] = React.useState([]);
  const [modalIngredientsDetailsActive, setModalIngredientsDetailsActive] = React.useState(false);
  const [modalOrderDetailsActive, setModalOrderDetailsActive] = React.useState(false);
  const [itemId, getId] = React.useState(null);

  React.useEffect(() => {
    const getData = () => {
      return fetch(URL)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject('Ошибка');
        })
        .then(data => {
          return data;
        })
    }

    getData()
      .then((data) => {
        setData(data.data);
      })
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles['constructor-page']}>
          <BurgerIngredients dataArray={dataArray} modalIngredientsDetailsActive={modalIngredientsDetailsActive} setModalIngredientsDetailsActive={setModalIngredientsDetailsActive} getId={getId} itemId={itemId} />
          <BurgerConstructor dataArray={dataArray} modalOrderDetailsActive={modalOrderDetailsActive} setModalOrderDetailsActive={setModalOrderDetailsActive} />
        </div>
      </main>
    </div>
  );
}

export default App;
