import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import IngredientsDetails from '../ingredient-details/ingredient-details';

function App() {
  const URL = 'https://norma.nomoreparties.space/api/ingredients';

  const [dataArray, setData] = React.useState([]);
  const [totalPrice, countTotalPrice] = React.useState(0);
  const [isOpenModal, setOpenModal] = React.useState(false);
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

  console.log(dataArray);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles['constructor-page']}>
          <BurgerIngredients dataArray={dataArray} setOpenModal={setOpenModal} getId={getId} />
          <BurgerConstructor dataArray={dataArray} price={totalPrice} countTotalPrice={countTotalPrice} />
        </div>
      </main>
      <ModalOverlay isOpenModal={isOpenModal}>
        <Modal>
          <IngredientsDetails setOpenModal={setOpenModal} itemId={itemId} dataArray={dataArray} />
        </Modal>
      </ModalOverlay>
    </div>
  );
}

export default App;
