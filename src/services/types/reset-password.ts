import {
  POST_FORGOT_PASSWORD_FAILED,
  POST_FORGOT_PASSWORD_REQUEST,
  POST_FORGOT_PASSWORD_SUCCESS,
  POST_RESET_PASSWORD_FAILED,
  POST_RESET_PASSWORD_REQUEST,
  POST_RESET_PASSWORD_SUCCESS,
} from '../actions/reset-password';

export interface IPostForgotPasswordRequestAction {
  readonly type: typeof POST_FORGOT_PASSWORD_REQUEST;
}

export interface IPostForgotPasswordSuccessAction {
  readonly type: typeof POST_FORGOT_PASSWORD_SUCCESS;
  success: boolean;
}

export interface IPostForgotPasswordFaildAction {
  readonly type: typeof POST_FORGOT_PASSWORD_FAILED;
}

export interface IPostResetPasswordRequestAction {
  readonly type: typeof POST_RESET_PASSWORD_REQUEST;
}

export interface IPostResetPasswordSuccessAction {
  readonly type: typeof POST_RESET_PASSWORD_SUCCESS;
  success: boolean;
}

export interface IPostResetPasswordFailedAction {
  readonly type: typeof POST_RESET_PASSWORD_FAILED;
}

export type TResetPasswordActions =
  | IPostForgotPasswordRequestAction
  | IPostForgotPasswordSuccessAction
  | IPostForgotPasswordFaildAction
  | IPostResetPasswordRequestAction
  | IPostResetPasswordSuccessAction
  | IPostResetPasswordFailedAction;

export interface IResetPasswordState {
  forgotPasswordRequest: boolean;
  forgotPasswordFailed: boolean;
  forgotPasswordSuccess: boolean;

  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
  resetPasswordSuccess: boolean;
}
