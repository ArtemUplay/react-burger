import styles from './ingredient-details.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_CURRENT_INGREDIENT } from '../../services/actions/ingredient-details';

const IngredientsDetails = () => {
  const currentIngredient = useSelector((store) => store.ingredientDetails.currentIngredient);
  const dispatch = useDispatch();

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`pt-10 pl-10 pr-10 ${styles.top}`}>
        <h2 className={` ${styles.title}`}>Детали ингредиента</h2>
        <button
          className={`${styles.button}`}
          onClick={() => {
            dispatch({
              type: DELETE_CURRENT_INGREDIENT,
            });
          }}>
          <CloseIcon type="primary" />
        </button>
      </div>
      <img className={`${styles.image}`} src={currentIngredient.image} alt={currentIngredient.name} />
      <h3 className={`mt-4 mb-8 ${styles.name}`}>{currentIngredient.name}</h3>
      <ul className={`${styles.list}`}>
        <li className={`${styles.column}`}>
          <span className={`${styles['column-name']}`}>Калории,ккал</span>
          <span className={`${styles['column-value']}`}>{currentIngredient.calories}</span>
        </li>
        <li className={`${styles.column}`}>
          <span className={`${styles['column-name']}`}>Белки, г</span>
          <span className={`${styles['column-value']}`}>{currentIngredient.proteins}</span>
        </li>
        <li className={`${styles.column}`}>
          <span className={`${styles['column-name']}`}>Жиры, г</span>
          <span className={`${styles['column-value']}`}>{currentIngredient.fat}</span>
        </li>
        <li className={`${styles.column}`}>
          <span className={`${styles['column-name']}`}>Углеводы, г</span>
          <span className={`${styles['column-value']}`}>{currentIngredient.carbohydrates}</span>
        </li>
      </ul>
    </div>
  );
};

export default IngredientsDetails;
