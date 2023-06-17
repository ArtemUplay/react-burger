import {
  POST_REGISTER_DATA_FAILED,
  POST_REGISTER_DATA_REQUEST,
  POST_REGISTER_DATA_SUCCESS,
} from '../actions/register';

export interface IRegisterFormData {
  email: string;
  password: string;
  name: string;
}

export interface IPostRegisterDataRequestAction {
  readonly type: typeof POST_REGISTER_DATA_REQUEST;
}

export interface IPostRegisterDataSuccessAction {
  readonly type: typeof POST_REGISTER_DATA_SUCCESS;
  accessToken: string;
  success: boolean;
}

export interface IPostRegisterDataFailedAction {
  readonly type: typeof POST_REGISTER_DATA_FAILED;
}

export type TRegisterActions =
  | IPostRegisterDataRequestAction
  | IPostRegisterDataSuccessAction
  | IPostRegisterDataFailedAction;
