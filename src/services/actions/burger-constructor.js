import { v4 as uuidv4 } from 'uuid';
export const SET_CONSTRUCTOR_BUN = 'GET_CONSTRUCTOR_ITEMS';
export const SET_CONSTRUCTOR_INGRIDIENT = 'SET_CONSTRUCTOR_INGRIDIENT';
export const DELETE_CONSTRUCTOR_INGREDIENT = 'DELETE_CONSTRUCTOR_INGREDIENT';
export const UPDATE_ORDER_INGREDIENTS = 'UPDATE_ORDER_INGREDIENTS';

export const setIngredientToConstructor =
  (ingredientId, items, indexArray = 1) =>
  (dispatch) => {
    // console.log(ingredientId, items, indexArray);
    const uniqueId = uuidv4();
    const findedIngredient = items.find((ingredient) => ingredient._id === ingredientId);
    const ingredient = { ...findedIngredient, uniqueId };

    if (ingredient.type === 'bun') {
      dispatch({ type: SET_CONSTRUCTOR_BUN, ingredient, indexArray });
    } else {
      dispatch({ type: SET_CONSTRUCTOR_INGRIDIENT, ingredient, indexArray });
    }
  };

export const deleteConstructorIngredient = (uniqueId) => (dispatch) => {
  console.log(uniqueId);
  dispatch({ type: DELETE_CONSTRUCTOR_INGREDIENT, ingredientIndex: uniqueId });
};
