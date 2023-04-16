import {
  SET_CONSTRUCTOR_BUN,
  SET_CONSTRUCTOR_INGRIDIENT,
  DELETE_CONSTRUCTOR_INGREDIENT,
} from '../actions/burger-constructor';

const initialState = {
  burgerObject: {
    bun: {},
    ingredients: [],
  },
};

export const BurgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONSTRUCTOR_BUN: {
      return {
        ...state,
        burgerObject: {
          ...state.burgerObject,
          bun: action.bun,
        },
      };
    }
    case SET_CONSTRUCTOR_INGRIDIENT: {
      return {
        ...state,
        burgerObject: {
          ...state.burgerObject,
          ingredients: [...state.burgerObject.ingredients, action.ingredient],
        },
      };
    }
    case DELETE_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        burgerObject: {
          ...state.burgerObject,
          ingredients: state.burgerObject.ingredients.filter((item) => {
            console.log(item.index !== action.ingredientIndex);
            return item.index !== action.ingredientIndex;
          }),
        },
      };
    }
    default: {
      return state;
    }
  }
};
