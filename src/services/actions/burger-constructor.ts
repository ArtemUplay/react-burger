import { v4 as uuidv4 } from 'uuid';
import { IIngredient } from '../../components/burger-ingredients/burger-ingredients.types';
import { AppDispatch, AppThunk } from '../../types';
export const SET_CONSTRUCTOR_BUN = 'SET_CONSTRUCTOR_BUN' as const;
export const SET_CONSTRUCTOR_INGRIDIENT = 'SET_CONSTRUCTOR_INGRIDIENT' as const;
export const DELETE_CONSTRUCTOR_INGREDIENT =
  'DELETE_CONSTRUCTOR_INGREDIENT' as const;

export const setIngredientToConstructor =
  (
    ingredientId: string,
    items: Array<IIngredient>,
    indexArray: number = 1
  ): AppThunk =>
  (dispatch: AppDispatch) => {
    const uniqueId = uuidv4();
    const findedIngredient = items.find(
      (ingredient) => ingredient._id === ingredientId
    );

    if (findedIngredient) {
      const ingredient = { ...findedIngredient, uniqueId };

      if (ingredient.type === 'bun') {
        dispatch({ type: SET_CONSTRUCTOR_BUN, ingredient, indexArray });
      } else {
        dispatch({ type: SET_CONSTRUCTOR_INGRIDIENT, ingredient, indexArray });
      }
    }
  };

export const deleteConstructorIngredient =
  (uniqueId: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch({
      type: DELETE_CONSTRUCTOR_INGREDIENT,
      ingredientIndex: uniqueId,
    });
  };
