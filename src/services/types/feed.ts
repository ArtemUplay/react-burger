import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_MESSAGE,
  WS_FEED_CONNECTION_START,
} from '../actions/feed';
import { IMessageInfo } from './orders-history';

export interface IWsFeedConnectionStartAction {
  readonly type: typeof WS_FEED_CONNECTION_START;
}

export interface IWsFeedConnectionStartError {
  readonly type: typeof WS_FEED_CONNECTION_ERROR;
  payload: string;
}

export interface IWsFeedConnectionStartClosed {
  readonly type: typeof WS_FEED_CONNECTION_CLOSED;
}

export interface IWsFeedConnectionStartMessage {
  readonly type: typeof WS_FEED_CONNECTION_MESSAGE;
  payload: IMessageInfo;
}

export type TWsFeedConnectionActions =
  | IWsFeedConnectionStartAction
  | IWsFeedConnectionStartError
  | IWsFeedConnectionStartClosed
  | IWsFeedConnectionStartMessage;

export interface IOrdersFeedState {
  wsConnected: boolean;
  messages: Array<IMessageInfo>;
  error: string | undefined;
}
