import {
  POST_LOGIN_DATA_REQUEST,
  POST_LOGIN_DATA_SUCCESS,
  POST_LOGIN_DATA_FAILED,
} from '../actions/login';

import {
  POST_REGISTER_DATA_REQUEST,
  POST_REGISTER_DATA_SUCCESS,
  POST_REGISTER_DATA_FAILED,
} from '../actions/register';

import {
  GET_PROFILE_DATA_REQUEST,
  GET_PROFILE_DATA_SUCCESS,
  GET_PROFILE_DATA_FAILED,
  POST_LOGOUT_PROFILE_REQUEST,
  POST_LOGOUT_PROFILE_SUCCESS,
  POST_LOGOUT_PROFILE_FAILED,
  PATCH_PROFILE_FORM_DATA_REQUEST,
  PATCH_PROFILE_FORM_DATA_SUCCESS,
  PATCH_PROFILE_FORM_DATA_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILED,
} from '../actions/profile';
import { IProfileState, TProfileActions } from '../types/profile';

const initialState: IProfileState = {
  profileUserData: null,
  accessToken: null,

  isAuth: false,

  loginRequest: false,
  loginFailed: false,

  registerRequest: false,
  registerFailed: false,

  profileUserDataRequest: false,
  profileUserDataFailed: false,

  logOutProfileRequest: false,
  logOutProfileFailed: false,

  patchUserDataRequest: false,
  patchUserDataFailed: false,

  updateTokenRequest: false,
  updateTokenFailed: false,
};

export const profilePageReducer = (
  state = initialState,
  action: TProfileActions
): IProfileState => {
  switch (action.type) {
    case POST_LOGIN_DATA_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case POST_LOGIN_DATA_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
        accessToken: action.accessToken,
        isAuth: action.success,
      };
    }
    case POST_LOGIN_DATA_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
      };
    }
    case POST_REGISTER_DATA_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case POST_REGISTER_DATA_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: false,
        accessToken: action.accessToken,
        isAuth: action.success,
      };
    }
    case POST_REGISTER_DATA_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
      };
    }
    case GET_PROFILE_DATA_REQUEST: {
      return {
        ...state,
        profileUserDataRequest: true,
      };
    }
    case GET_PROFILE_DATA_SUCCESS: {
      return {
        ...state,
        profileUserData: action.profileUserData,
        profileUserDataRequest: false,
      };
    }
    case GET_PROFILE_DATA_FAILED: {
      return {
        ...state,
        profileUserDataRequest: false,
        profileUserDataFailed: true,
      };
    }
    case POST_LOGOUT_PROFILE_REQUEST: {
      return {
        ...state,
        logOutProfileRequest: true,
      };
    }
    case POST_LOGOUT_PROFILE_SUCCESS: {
      return {
        ...state,
        logOutProfileRequest: false,
        accessToken: null,
        profileUserData: null,
        isAuth: false,
      };
    }
    case POST_LOGOUT_PROFILE_FAILED: {
      return {
        ...state,
        logOutProfileFailed: true,
        logOutProfileRequest: false,
      };
    }
    case PATCH_PROFILE_FORM_DATA_REQUEST: {
      return {
        ...state,
        patchUserDataRequest: true,
      };
    }
    case PATCH_PROFILE_FORM_DATA_SUCCESS: {
      return {
        ...state,
        patchUserDataRequest: false,
      };
    }
    case PATCH_PROFILE_FORM_DATA_FAILED: {
      return {
        ...state,
        patchUserDataRequest: false,
        profileUserDataFailed: true,
      };
    }
    case UPDATE_TOKEN_REQUEST: {
      return {
        ...state,
        updateTokenRequest: true,
      };
    }
    case UPDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        updateTokenRequest: false,
        accessToken: action.accessToken,
      };
    }
    case UPDATE_TOKEN_FAILED: {
      return {
        ...state,
        updateTokenRequest: false,
        updateTokenFailed: true,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
