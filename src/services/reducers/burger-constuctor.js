import {
  SET_CONSTRUCTOR_BUN,
  SET_CONSTRUCTOR_INGRIDIENT,
  DELETE_CONSTRUCTOR_INGREDIENT,
} from '../actions/burger-constructor';

const initialState = {
  burgerConstructorIngredients: [],
};

export const BurgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONSTRUCTOR_BUN: {
      const newBurgerConstructorIngredients = [...state.burgerConstructorIngredients].filter(
        (item) => item.type !== 'bun'
      );
      newBurgerConstructorIngredients.unshift(action.ingredient);

      return {
        ...state,
        burgerConstructorIngredients: newBurgerConstructorIngredients,
      };
    }
    case SET_CONSTRUCTOR_INGRIDIENT: {
      const newBurgerConstructorIngredients = [...state.burgerConstructorIngredients];
      newBurgerConstructorIngredients.splice(action.indexArray, 0, action.ingredient);

      return {
        ...state,
        burgerConstructorIngredients: newBurgerConstructorIngredients,
      };
    }
    case DELETE_CONSTRUCTOR_INGREDIENT: {
      const newBurgerConstructorIngredients = [...state.burgerConstructorIngredients].filter((item) => {
        return item.uniqueId !== action.ingredientIndex;
      });

      return {
        ...state,
        burgerConstructorIngredients: newBurgerConstructorIngredients,
      };
    }
    default: {
      return state;
    }
  }
};
