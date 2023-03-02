import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  const URL = 'https://norma.nomoreparties.space/api/ingredients';

  const [dataArray, setData] = React.useState([]);
  const [totalPrice, countTotalPrice] = React.useState(0);


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

  React.useEffect(() => {
    let sumOfPrices = 0;

    dataArray.forEach(item => {
      if (item.type !== 'bun') {
        sumOfPrices = sumOfPrices + item.price;
      }
    })

    countTotalPrice(sumOfPrices);
  }, [dataArray])

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles['constructor-page']}>
          <BurgerIngredients dataArray={dataArray} />
          <BurgerConstructor dataArray={dataArray} price={totalPrice} />
        </div>
      </main>
    </div>
  );
}

export default App;
