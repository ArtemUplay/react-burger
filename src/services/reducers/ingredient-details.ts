import {
  SET_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT,
} from '../actions/ingredient-details';
import {
  IIngredientDetailsState,
  TIngredientDetailsActions,
} from '../types/ingredient-details';

const initialState: IIngredientDetailsState = {
  currentIngredient: null,
};

export const ingredientsDetailsReducer = (
  state = initialState,
  action: TIngredientDetailsActions
): IIngredientDetailsState => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.currentIngredient,
      };
    }
    case DELETE_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: null,
      };
    }
    default: {
      return state;
    }
  }
};
