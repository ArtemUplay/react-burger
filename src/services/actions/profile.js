import {
  checkResponse,
  setCookie,
  deleteCookie,
} from '../../components/utils/utils';
import { URL } from '../../constants/constants';

export const GET_PROFILE_DATA_REQUEST = 'GET_PROFILE_DATA_REQUEST';
export const GET_PROFILE_DATA_SUCCESS = 'GET_PROFILE_DATA_SUCCESS';
export const GET_PROFILE_DATA_FAILED = 'GET_PROFILE_DATA_FAILED';
export const POST_LOGOUT_PROFILE_REQUEST = 'POST_LOGOUT_PROFILE_REQUEST';
export const POST_LOGOUT_PROFILE_SUCCESS = 'POST_LOGOUT_PROFILE_SUCCESS';
export const POST_LOGOUT_PROFILE_FAILED = 'POST_LOGOUT_PROFILE_FAILED';
export const PATCH_PROFILE_FORM_DATA_REQUEST =
  'PATCH_PROFILE_FORM_DATA_REQUEST';
export const PATCH_PROFILE_FORM_DATA_SUCCESS =
  'PATCH_PROFILE_FORM_DATA_SUCCESS';
export const PATCH_PROFILE_FORM_DATA_FAILED = 'PATCH_PROFILE_FORM_DATA_FAILED';
export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED';

export function logOutProfile(refreshToken) {
  return function (dispatch) {
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
        deleteCookie('refreshToken');
      })
      .catch((error) => {
        dispatch({
          type: GET_PROFILE_DATA_FAILED,
        });

        console.log(error);
      });
  };
}

export function patchProfileData(formData, accessToken) {
  return function (dispatch) {
    dispatch({ type: PATCH_PROFILE_FORM_DATA_REQUEST });

    fetch(`${URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => checkResponse(response))
      .then((data) => {
        dispatch({ type: POST_LOGOUT_PROFILE_SUCCESS, success: data.success });
      })
      .catch((error) => {
        dispatch({
          type: GET_PROFILE_DATA_FAILED,
        });

        console.log(error);
      });
  };
}

export function updateToken(refreshToken) {
  return function (dispatch) {
    dispatch({ type: UPDATE_TOKEN_REQUEST });

    fetch(`${URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: refreshToken }),
    })
      .then((response) => checkResponse(response))
      .then((data) => {
        const refreshToken = data.refreshToken;

        setCookie('refreshToken', refreshToken);
        dispatch({ type: UPDATE_TOKEN_SUCCESS, accessToken: data.accessToken });
      })
      .catch((error) => {
        dispatch({ type: UPDATE_TOKEN_FAILED });
        console.log(error);
      });
  };
}

export function getProfileData(accessToken) {
  return function (dispatch) {
    dispatch({ type: GET_PROFILE_DATA_REQUEST });

    fetch(`${URL}/auth/user`, {
      headers: {
        Authorization: accessToken,
      },
    })
      .then((response) => checkResponse(response))
      .then((data) => {
        const profileUserData = data.user;
        dispatch({ type: GET_PROFILE_DATA_SUCCESS, profileUserData });
      })
      .catch((error) => {
        dispatch({ type: GET_PROFILE_DATA_FAILED });

        console.log(error);
      });
  };
}
