import {
  DELETE_ORDER_NUMBER,
  GET_ORDER_NUMBER_FAILED,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
} from '../actions/order-details';

export interface IGetNumberRequestAction {
  readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}

export interface IGetOrderNumberSuccessAction {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
  number: number;
}

export interface IGetOrderNumberFailedAction {
  readonly type: typeof GET_ORDER_NUMBER_FAILED;
}

export interface IDeleteOrderNumberAction {
  readonly type: typeof DELETE_ORDER_NUMBER;
}

export type TOrderDetailsActions =
  | IGetNumberRequestAction
  | IGetOrderNumberSuccessAction
  | IGetOrderNumberFailedAction
  | IDeleteOrderNumberAction;

export interface IOrderDetailsState {
  readonly order: {
    readonly orderNumber: number | null;
  };
  readonly orderNumberRequest: boolean;
  readonly orderNumberFailed: boolean;
}
