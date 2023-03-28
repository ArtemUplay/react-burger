import React, { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { IngredientsContext } from '../../services/ingredientsContext';
import { checkResponse } from '../utils/utils';

function App() {
  const URL = 'https://norma.nomoreparties.space/api/ingredients';
  const [burgersState, setBurgersState] = useState([]);

  const [modalIngredientsDetailsActive, setModalIngredientsDetailsActive] =
    useState(false);
  const [modalOrderDetailsActive, setModalOrderDetailsActive] = useState(false);

  useEffect(() => {
    const getData = () => {
      return fetch(URL)
        .then((response) => {
          return checkResponse(response);
        })
        .then((data) => {
          return data;
        });
    };

    getData().then((data) => {
      setBurgersState(data.data);
    });
  }, []);

  return (
    <div className={styles.app}>
      <IngredientsContext.Provider value={burgersState}>
        <AppHeader />
        <main className={styles.main}>
          <div className={styles['constructor-page']}>
            <BurgerIngredients
              modalIngredientsDetailsActive={modalIngredientsDetailsActive}
              setModalIngredientsDetailsActive={
                setModalIngredientsDetailsActive
              }
            />
            <BurgerConstructor
              modalOrderDetailsActive={modalOrderDetailsActive}
              setModalOrderDetailsActive={setModalOrderDetailsActive}
            />
          </div>
        </main>
      </IngredientsContext.Provider>
    </div>
  );
}

export default App;
