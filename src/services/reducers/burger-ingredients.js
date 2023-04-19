import { GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from '../actions/burger-ingredients';

const initialState = {
  items: [],

  itemsRequest: false,
  itemsFailed: false,
};

export const BurgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemRequest: false,
        itemsFailed: false,
        items: action.items,
      };
    }
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        itemRequest: false,
        itemsFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
