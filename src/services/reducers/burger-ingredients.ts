import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../actions/burger-ingredients';
import {
  IBurgerIngredientsState,
  TBurgerIngredientsActions,
} from '../types/burger-ingredients';

const initialState: IBurgerIngredientsState = {
  ingredients: [],

  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const BurgerIngredientsReducer = (
  state = initialState,
  action: TBurgerIngredientsActions
): IBurgerIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.ingredients,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
