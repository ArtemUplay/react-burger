import styles from './ingredient-details.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from '../utils/utils';
import { useDispatch } from 'react-redux';
import { SET_CURRENT_INGREDIENT, DELETE_CURRENT_INGREDIENT } from '../../services/actions/ingredient-details';
import { useEffect } from 'react';

const IngredientsDetails = ({ setModalActive, itemId, dataArray }) => {
  const dispatch = useDispatch();

  const data = dataArray.find((item) => {
    return item._id === itemId;
  });

  useEffect(() => {
    dispatch({
      type: SET_CURRENT_INGREDIENT,
      currentIngredient: data,
    });

    return () => {
      dispatch({
        type: DELETE_CURRENT_INGREDIENT,
      });
    };
  }, []);

  const checkIngridient = (item) => {
    return data ? item : null;
  };

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`pt-10 pl-10 pr-10 ${styles.top}`}>
        <h2 className={` ${styles.title}`}>Детали ингредиента</h2>
        <button
          className={`${styles.button}`}
          onClick={() => {
            return setModalActive(false);
          }}>
          <CloseIcon type="primary" />
        </button>
      </div>
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
    </div>
  );
};

IngredientsDetails.propTypes = {
  setModalActive: PropTypes.func.isRequired,
  itemId: PropTypes.string,
  dataArray: PropTypes.arrayOf(PropTypes.shape(ingredientsPropTypes)).isRequired,
};

export default IngredientsDetails;
