import { IOrder } from '../../pages/feed/feed.types';
import {
  WS_ORDERS_HISTORY_CONNECTION_CLOSED,
  WS_ORDERS_HISTORY_CONNECTION_ERROR,
  WS_ORDERS_HISTORY_CONNECTION_MESSAGE,
  WS_ORDERS_HISTORY_CONNECTION_START,
} from '../actions/orders-history';

export interface IWsOrdersHistoryConnectionStart {
  readonly type: typeof WS_ORDERS_HISTORY_CONNECTION_START;
}

export interface IWsOrdersHistoryConnectionError {
  readonly type: typeof WS_ORDERS_HISTORY_CONNECTION_ERROR;
  payload: string;
}

export interface IWsOrdersHistoryConnectionClosed {
  readonly type: typeof WS_ORDERS_HISTORY_CONNECTION_CLOSED;
}

export interface IWsOrdersHistoryConnectionMessage {
  readonly type: typeof WS_ORDERS_HISTORY_CONNECTION_MESSAGE;
  payload: IMessageInfo;
}

export type TOrdersHistoryActions =
  | IWsOrdersHistoryConnectionStart
  | IWsOrdersHistoryConnectionError
  | IWsOrdersHistoryConnectionClosed
  | IWsOrdersHistoryConnectionMessage;

export interface IMessageInfo {
  success: boolean;
  orders: Array<IOrder>;
  total: number;
  totalToday: number;
}

export interface IOrdersHistoryState {
  wsConnected: boolean;
  messages: Array<IMessageInfo>;
  error: string | undefined;
}
