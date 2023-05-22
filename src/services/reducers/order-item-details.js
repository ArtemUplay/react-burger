import {
  SET_CURRENT_ORDER_DETAILS,
  DELETE_CURRENT_ORDER_DETAILS,
} from '../actions/order-item-details';

const initialState = {
  currentOrder: null,
};

export const orderItemDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ORDER_DETAILS: {
      return {
        ...state,
        currentOrder: action.currentOrder,
      };
    }
    case DELETE_CURRENT_ORDER_DETAILS: {
      return {
        ...state,
        currentOrder: null,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
