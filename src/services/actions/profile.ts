import { checkResponse, removeBearer } from '../../components/utils/utils';
import { URL } from '../../constants/constants';
import { IProfileData } from '../types/profile';
import { AppDispatch, AppThunk } from '../../types';
import {
  IGetProfileData,
  IProfilePatchData,
  IUpdateToken,
} from '../../types/data';

export const GET_PROFILE_DATA_REQUEST = 'GET_PROFILE_DATA_REQUEST' as const;
export const GET_PROFILE_DATA_SUCCESS = 'GET_PROFILE_DATA_SUCCESS' as const;
export const GET_PROFILE_DATA_FAILED = 'GET_PROFILE_DATA_FAILED' as const;
export const POST_LOGOUT_PROFILE_REQUEST =
  'POST_LOGOUT_PROFILE_REQUEST' as const;
export const POST_LOGOUT_PROFILE_SUCCESS =
  'POST_LOGOUT_PROFILE_SUCCESS' as const;
export const POST_LOGOUT_PROFILE_FAILED = 'POST_LOGOUT_PROFILE_FAILED' as const;
export const PATCH_PROFILE_FORM_DATA_REQUEST =
  'PATCH_PROFILE_FORM_DATA_REQUEST' as const;
export const PATCH_PROFILE_FORM_DATA_SUCCESS =
  'PATCH_PROFILE_FORM_DATA_SUCCESS' as const;
export const PATCH_PROFILE_FORM_DATA_FAILED =
  'PATCH_PROFILE_FORM_DATA_FAILED' as const;
export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST' as const;
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS' as const;
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED' as const;

export const logOutProfile =
  (refreshToken: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch({ type: POST_LOGOUT_PROFILE_REQUEST });

    fetch(`${URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'token': refreshToken,
      }),
    })
      .then((response) => checkResponse(response))
      .then((data) => {
        dispatch({ type: POST_LOGOUT_PROFILE_SUCCESS, success: data.success });
        localStorage.removeItem('refreshToken');
      })
      .catch((error) => {
        dispatch({
          type: GET_PROFILE_DATA_FAILED,
        });

        console.log(error);
      });
  };

export const patchProfileData =
  (formData: IProfileData, accessToken: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch({ type: PATCH_PROFILE_FORM_DATA_REQUEST });

    fetch(`${URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => checkResponse(response))
      .then((data: IProfilePatchData) => {
        console.log(data);
        dispatch({ type: POST_LOGOUT_PROFILE_SUCCESS, success: data.success });
      })
      .catch((error) => {
        if (error.message === 'jwt expired') {
          dispatch(updateToken());
        }

        dispatch({
          type: GET_PROFILE_DATA_FAILED,
        });

        console.log(error);
      });
  };

export const updateToken = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch({ type: UPDATE_TOKEN_REQUEST });

  fetch(`${URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  })
    .then((response) => checkResponse(response))
    .then((data: IUpdateToken) => {
      const refreshToken = data.refreshToken;

      localStorage.setItem('refreshToken', refreshToken);
      dispatch({
        type: UPDATE_TOKEN_SUCCESS,
        accessToken: removeBearer(data.accessToken),
      });
    })
    .catch((error) => {
      dispatch({ type: UPDATE_TOKEN_FAILED });
      console.log(error);
    });
};

export const getProfileData =
  (accessToken: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch({ type: GET_PROFILE_DATA_REQUEST });

    fetch(`${URL}/auth/user`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then((response) => checkResponse(response))
      .then((data: IGetProfileData) => {
        const profileUserData = data.user;
        dispatch({ type: GET_PROFILE_DATA_SUCCESS, profileUserData });
      })
      .catch((error) => {
        if (error.message === 'jwt expired') {
          dispatch(updateToken());
        } else {
          dispatch({ type: GET_PROFILE_DATA_FAILED });
          console.log(error);
        }
      });
  };
