import {
  WS_ORDERS_HISTORY_CONNECTION_CLOSED,
  WS_ORDERS_HISTORY_CONNECTION_ERROR,
  WS_ORDERS_HISTORY_CONNECTION_MESSAGE,
  WS_ORDERS_HISTORY_CONNECTION_START,
} from '../actions/orders-history';
import {
  IOrdersHistoryState,
  IWsOrdersHistoryActions,
} from '../types/orders-history';

const initialState: IOrdersHistoryState = {
  wsConnected: false,
  messages: [],
  error: undefined,
};

export const ordersHistoryReducer = (
  state = initialState,
  action: IWsOrdersHistoryActions
): IOrdersHistoryState => {
  switch (action.type) {
    case WS_ORDERS_HISTORY_CONNECTION_START:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_ORDERS_HISTORY_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_ORDERS_HISTORY_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case WS_ORDERS_HISTORY_CONNECTION_MESSAGE:
      return {
        ...state,
        error: undefined,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};
