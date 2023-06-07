import { useEffect } from 'react';
import styles from './ingredient-details.module.css';
import { useDispatch } from 'react-redux';
import { SET_CURRENT_INGREDIENT } from '../../services/actions/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../types/hooks';
import { IIngredient } from '../burger-ingredients/burger-ingredients.types';

const IngredientsDetails = () => {
  const currentIngredient = useSelector(
    (store) => store.ingredientDetails.currentIngredient
  );
  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );
  const dispatch = useDispatch();

  const { id } = useParams();
  const currentItem = ingredients.find((item: IIngredient) => item._id === id);

  useEffect(() => {
    dispatch({ type: SET_CURRENT_INGREDIENT, currentIngredient: currentItem });
  }, [dispatch, currentItem]);

  return (
    <>
      {currentIngredient && (
        <div className={`${styles.wrapper}`}>
          <div className={`pt-10 pl-10 pr-10 ${styles.top}`}>
            <h2 className={` ${styles.title}`}>Детали ингредиента</h2>
          </div>
          <img
            className={`${styles.image}`}
            src={currentIngredient.image}
            alt={currentIngredient.name}
          />
          <h3 className={`mt-4 mb-8 ${styles.name}`}>
            {currentIngredient.name}
          </h3>
          <ul className={`${styles.list}`}>
            <li className={`${styles.column}`}>
              <span className={`${styles['column-name']}`}>Калории,ккал</span>
              <span className={`${styles['column-value']}`}>
                {currentIngredient.calories}
              </span>
            </li>
            <li className={`${styles.column}`}>
              <span className={`${styles['column-name']}`}>Белки, г</span>
              <span className={`${styles['column-value']}`}>
                {currentIngredient.proteins}
              </span>
            </li>
            <li className={`${styles.column}`}>
              <span className={`${styles['column-name']}`}>Жиры, г</span>
              <span className={`${styles['column-value']}`}>
                {currentIngredient.fat}
              </span>
            </li>
            <li className={`${styles.column}`}>
              <span className={`${styles['column-name']}`}>Углеводы, г</span>
              <span className={`${styles['column-value']}`}>
                {currentIngredient.carbohydrates}
              </span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default IngredientsDetails;
