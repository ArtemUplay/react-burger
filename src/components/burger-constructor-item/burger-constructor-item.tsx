import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-item.module.css';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  DELETE_CONSTRUCTOR_INGREDIENT,
  setIngredientToConstructor,
  deleteConstructorIngredient,
} from '../../services/actions/burger-constructor';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { ingredientsPropTypes } from '../utils/utils';
import { useSelector } from '../../types/hooks';
import {
  IBurgerConstructorDropItem,
  IBurgerConstructorItemProps,
} from './burger-constructor-item.types';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../types';

const BurgerConstructorItem = ({
  item,
  uniqueId,
}: IBurgerConstructorItemProps) => {
  const burgerConstructorIngredients = useSelector(
    (store) => store.burgerConstructor.burgerConstructorIngredients
  );
  const items = useSelector((store) => store.burgerIngredients.ingredients);
  const ingredientIndexArray = burgerConstructorIngredients.findIndex(
    (elem) => elem.uniqueId === uniqueId
  );

  const ingredientId = item._id;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const handleDelete = (ingredientIndex: string) => {
    dispatch({ type: DELETE_CONSTRUCTOR_INGREDIENT, ingredientIndex });
  };

  const [{ dragOpacity }, drag] = useDrag(
    () => ({
      type: 'constructorItem',
      item: { ingredientId, index: item.uniqueId, ingredientIndexArray },
      collect: (monitor) => ({
        dragOpacity: monitor.isDragging() ? 0 : 1,
      }),
    }),
    [ingredientIndexArray, burgerConstructorIngredients]
  );

  const [{ dropOpacity }, drop] = useDrop(
    () => ({
      accept: 'constructorItem',
      drop(item: IBurgerConstructorDropItem) {
        dispatch(deleteConstructorIngredient(item.index));
        dispatch(
          setIngredientToConstructor(
            item.ingredientId,
            items,
            ingredientIndexArray
          )
        );
      },
      collect: (monitor: DropTargetMonitor) => ({
        dropOpacity: monitor.isOver() ? 0.5 : 1,
      }),
    }),
    [ingredientIndexArray, burgerConstructorIngredients]
  );

  const opacity = dragOpacity === 0 ? 0 : dropOpacity;

  return (
    <li
      className={`${styles['list-item']}`}
      ref={(elem) => {
        drag(elem);
        drop(elem);
      }}
      style={{ opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => {
          handleDelete(item.uniqueId);
        }}
      />
    </li>
  );
};

BurgerConstructorItem.propTypes = {
  item: PropTypes.shape(ingredientsPropTypes).isRequired,
  uniqueId: PropTypes.string.isRequired,
};

export default BurgerConstructorItem;
