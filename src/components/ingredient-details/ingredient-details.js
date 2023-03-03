import styles from './ingredient-details.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientsDetails = ({ setOpenModal, itemId, dataArray }) => {
  const data = dataArray.find(item => {
    return item._id === itemId;
  })

  console.log(itemId);

  const checkIngridient = (item) => {
    return data ? item : null;
  }

  return (
    <>
      <div className={`pt-10 pl-10 pr-10 ${styles.top}`}>
        <h2 className={` ${styles.title}`}>Детали ингредиента</h2>
        <button className={`${styles.button}`} onClick={() => { return setOpenModal(false) }}>
          <CloseIcon type="primary" />
        </button>
      </div >
      <img className={`${styles.image}`} src={checkIngridient(data.image)} alt={checkIngridient(data.name)} />
      <h3 className={`mt-4 mb-8 ${styles.name}`}>{checkIngridient(data.name)}</h3>
      <ul className={`${styles.list}`}>
        <li className={`${styles.column}`}>
          <span className={`${styles['column-name']}`}>Калории,ккал</span>
          <span className={`${styles['column-value']}`}>{checkIngridient(data.calories)}</span>
        </li>
        <li className={`${styles.column}`}>
          <span className={`${styles['column-name']}`}>Белки, г</span>
          <span className={`${styles['column-value']}`}>{checkIngridient(data.proteins)}</span>
        </li>
        <li className={`${styles.column}`}>
          <span className={`${styles['column-name']}`}>Жиры, г</span>
          <span className={`${styles['column-value']}`}>{checkIngridient(data.fat)}</span>
        </li>
        <li className={`${styles.column}`}>
          <span className={`${styles['column-name']}`}>Углеводы, г</span>
          <span className={`${styles['column-value']}`}>{checkIngridient(data.carbohydrates)}</span>
        </li>
      </ul>
    </>
  )
}

export default IngredientsDetails;