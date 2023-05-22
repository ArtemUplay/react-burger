import {
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  DELETE_ORDER_NUMBER,
} from '../actions/order-details';

const initialState = {
  order: {
    orderNumber: null,
  },

  orderNumberRequest: false,
  orderNumberFailed: true,
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        orderNumberRequest: true,
      };
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        orderNumberRequest: false,
        order: {
          ...state.order,
          orderNumber: action.number,
        },
      };
    }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        orderNumberFailed: true,
        orderNumberRequest: false,
      };
    }
    case DELETE_ORDER_NUMBER: {
      return {
        ...state,
        order: {
          ...state.order,
          orderNumber: null,
        },
      };
    }
    default: {
      return state;
    }
  }
};
