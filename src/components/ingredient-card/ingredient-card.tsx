import { useMemo } from 'react';
import styles from './ingredient-card.module.css';
import { useSelector } from '../../types/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { SET_CURRENT_INGREDIENT } from '../../services/actions/ingredient-details';
import { Link, useLocation } from 'react-router-dom';
import { IIngredientCardProps } from './ingredient-card.types';
import { IIngredient } from '../burger-ingredients/burger-ingredients.types';

const IngredientCard = ({ ingredient }: IIngredientCardProps) => {
  const burgerConstructorIngredients = useSelector(
    (store) => store.burgerConstructor.burgerConstructorIngredients
  );
  const ingredientId = ingredient._id;
  const ingredientType = ingredient.type;
  const location = useLocation();
  const linkState = { backgroundIngredientsDetailsLocation: location };

  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ingredientId, ingredientType },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const countIngredient = useMemo(() => {
    return burgerConstructorIngredients.reduce(
      (sum: number, item: IIngredient) => {
        if (item.type === 'bun' && ingredientId === item._id) {
          return sum + 2;
        } else if (item._id === ingredient._id) {
          return sum + 1;
        } else {
          return sum;
        }
      },
      0
    );
  }, [ingredient, burgerConstructorIngredients, ingredientId]);

  return (
    <>
      <li
        id={ingredient._id}
        className={`pb-8 ${styles.card}`}
        onClick={() => {
          dispatch({
            type: SET_CURRENT_INGREDIENT,
            currentIngredient: ingredient,
          });
        }}
        ref={dragRef}
        style={{ backgroundColor: isDragging ? '#24247c' : '' }}>
        <Link
          className={`${styles.link}`}
          to={`ingredients/${ingredientId}`}
          state={linkState}>
          <img
            className={`mb-1 ml-4 mr-4 ${styles.image}`}
            src={ingredient.image}
            alt={ingredient.name}
          />
          <div className={`mb-1 ${styles['price-wrapper']}`}>
            <span className={`mr-2 ${styles.price}`}>{ingredient.price}</span>
            <CurrencyIcon type="primary" />
          </div>
          <h3 className={styles.name}>{ingredient.name}</h3>
        </Link>
        <Counter count={countIngredient} size="default" />
      </li>
    </>
  );
};

export default IngredientCard;
