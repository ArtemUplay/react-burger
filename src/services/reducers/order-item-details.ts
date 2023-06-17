import {
  SET_CURRENT_ORDER_DETAILS,
  DELETE_CURRENT_ORDER_DETAILS,
} from '../actions/order-item-details';
import {
  TOrderItemDetailsActions,
  IOrderItemDetailsState,
} from '../types/order-item-details';

const initialState: IOrderItemDetailsState = {
  currentOrder: null,
};

export const orderItemDetailsReducer = (
  state = initialState,
  action: TOrderItemDetailsActions
): IOrderItemDetailsState => {
  switch (action.type) {
    case SET_CURRENT_ORDER_DETAILS: {
      return {
        ...state,
        currentOrder: action.payload || null,
      };
    }
    case DELETE_CURRENT_ORDER_DETAILS: {
      return {
        ...state,
        currentOrder: null,
      };
    }
    default: {
      return state;
    }
  }
};
