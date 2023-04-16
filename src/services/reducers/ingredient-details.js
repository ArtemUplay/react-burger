import { SET_CURRENT_INGREDIENT, DELETE_CURRENT_INGREDIENT } from '../actions/ingredient-details';

const initialState = {
  currentIngredient: {},
};

export const ingredientsDetailsReducer = (state = initialState, action) => {
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
        currentIngredient: {},
      };
    }
    default: {
      return state;
    }
  }
};
