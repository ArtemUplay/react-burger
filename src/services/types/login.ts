import {
  POST_LOGIN_DATA_FAILED,
  POST_LOGIN_DATA_REQUEST,
  POST_LOGIN_DATA_SUCCESS,
} from '../actions/login';

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface IPostLoginDataRequestAction {
  readonly type: typeof POST_LOGIN_DATA_REQUEST;
}

export interface IPostLoginDataSuccessAction {
  readonly type: typeof POST_LOGIN_DATA_SUCCESS;
  accessToken: string;
  success: boolean;
}

export interface IPostLoginDataFailedAction {
  readonly type: typeof POST_LOGIN_DATA_FAILED;
}

export type TLoginActions =
  | IPostLoginDataRequestAction
  | IPostLoginDataSuccessAction
  | IPostLoginDataFailedAction;
