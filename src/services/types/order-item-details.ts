import { IOrder } from '../../pages/feed/feed.types';
import {
  DELETE_CURRENT_ORDER_DETAILS,
  SET_CURRENT_ORDER_DETAILS,
} from '../actions/order-item-details';

export interface ISetCurrentOrderDetailsAction {
  type: typeof SET_CURRENT_ORDER_DETAILS;
  payload: IOrder;
}

export interface IDeleteCurrentOrderDetailsAction {
  readonly type: typeof DELETE_CURRENT_ORDER_DETAILS;
}

export type TOrderItemDetailsActions =
  | ISetCurrentOrderDetailsAction
  | IDeleteCurrentOrderDetailsAction;

export interface IOrderItemDetailsState {
  currentOrder: IOrder | null;
}
