import {
  GET_PROFILE_DATA_FAILED,
  GET_PROFILE_DATA_REQUEST,
  GET_PROFILE_DATA_SUCCESS,
  PATCH_PROFILE_FORM_DATA_FAILED,
  PATCH_PROFILE_FORM_DATA_REQUEST,
  PATCH_PROFILE_FORM_DATA_SUCCESS,
  POST_LOGOUT_PROFILE_FAILED,
  POST_LOGOUT_PROFILE_REQUEST,
  POST_LOGOUT_PROFILE_SUCCESS,
  UPDATE_TOKEN_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
} from '../actions/profile';
import { TLoginActions } from './login';
import { TRegisterActions } from './register';

export interface IProfileData {
  email: string;
  name: string;
}

export interface IGetProfileDataRequestAction {
  readonly type: typeof GET_PROFILE_DATA_REQUEST;
}

export interface IGetProfileDataSuccessAction {
  readonly type: typeof GET_PROFILE_DATA_SUCCESS;
  profileUserData: IProfileData;
}

export interface IGetProfileDataFailedAction {
  readonly type: typeof GET_PROFILE_DATA_FAILED;
}

export interface IPatchProfileDataRequestAction {
  readonly type: typeof PATCH_PROFILE_FORM_DATA_REQUEST;
}

export interface IPatchProfileDataSuccessAction {
  readonly type: typeof PATCH_PROFILE_FORM_DATA_SUCCESS;
}

export interface IPatchProfileDataFailedAction {
  readonly type: typeof PATCH_PROFILE_FORM_DATA_FAILED;
}

export interface ILogoutProfileRequestAction {
  readonly type: typeof POST_LOGOUT_PROFILE_REQUEST;
}

export interface ILogoutProfileSuccessAction {
  readonly type: typeof POST_LOGOUT_PROFILE_SUCCESS;
}

export interface ILogoutProfileFailedAction {
  readonly type: typeof POST_LOGOUT_PROFILE_FAILED;
}

export interface IUpdateTokenRequestAction {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
}

export interface IUpdateTokenSuccessAction {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
  accessToken: string;
}

export interface IUpdateTokenFailedAction {
  readonly type: typeof UPDATE_TOKEN_FAILED;
}

export type TProfileActions =
  | IGetProfileDataRequestAction
  | IGetProfileDataSuccessAction
  | IGetProfileDataFailedAction
  | IPatchProfileDataRequestAction
  | IPatchProfileDataSuccessAction
  | IPatchProfileDataFailedAction
  | ILogoutProfileRequestAction
  | ILogoutProfileSuccessAction
  | ILogoutProfileFailedAction
  | IUpdateTokenRequestAction
  | IUpdateTokenSuccessAction
  | IUpdateTokenFailedAction
  | TRegisterActions
  | TLoginActions;

export interface IProfileState {
  profileUserData: IProfileData | null;
  accessToken: string | null;

  isAuth: boolean;

  loginRequest: boolean;
  loginFailed: boolean;

  registerRequest: boolean;
  registerFailed: boolean;

  profileUserDataRequest: boolean;
  profileUserDataFailed: boolean;

  logOutProfileRequest: boolean;
  logOutProfileFailed: boolean;

  patchUserDataRequest: boolean;
  patchUserDataFailed: boolean;

  updateTokenRequest: boolean;
  updateTokenFailed: boolean;
}
