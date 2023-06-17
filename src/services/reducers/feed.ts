import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_MESSAGE,
} from '../actions/feed';
import { IOrdersFeedState, IWsFeedActions } from '../types/feed';

const initialState: IOrdersFeedState = {
  wsConnected: false,
  messages: [],
  error: undefined,
};

export const feedReducer = (
  state = initialState,
  action: IWsFeedActions
): IOrdersFeedState => {
  switch (action.type) {
    case WS_FEED_CONNECTION_START:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_FEED_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_FEED_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case WS_FEED_CONNECTION_MESSAGE:
      return {
        ...state,
        error: undefined,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};
