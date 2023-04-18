import { GET_ORDER_NUMBER } from '../actions/order-details';

const initialState = {
  order: {
    number: null,
  },
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_NUMBER: {
      return {
        ...state,
        order: {
          ...state.order,
          number: action.number,
        },
      };
    }
    default: {
      return state;
    }
  }
};