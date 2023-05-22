import {
  checkResponse,
  removeBearer,
  setCookie,
} from '../../components/utils/utils';
import { URL } from '../../constants/constants';

export const POST_LOGIN_DATA_REQUEST = 'POST_LOGIN_DATA_REQUEST';
export const POST_LOGIN_DATA_SUCCESS = 'POST_LOGIN_DATA_SUCCESS';
export const POST_LOGIN_DATA_FAILED = 'POST_LOGIN_DATA_FAILED';

export function sendLoginData(formData) {
  return function (dispatch) {
    dispatch({ type: POST_LOGIN_DATA_REQUEST });

    fetch(`${URL}/auth/login`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(formData),
    })
      .then((response) => checkResponse(response))
      .then((responseData) => {
        const refreshToken = responseData.refreshToken;

        localStorage.setItem('refreshToken', refreshToken);
        dispatch({
          type: POST_LOGIN_DATA_SUCCESS,
          accessToken: removeBearer(responseData.accessToken),
          success: responseData.success,
        });
      })
      .catch((error) => {
        dispatch({
          type: POST_LOGIN_DATA_FAILED,
        });

        console.log(error);
      });
  };
}
