import { checkResponse } from '../../components/utils/utils';
import { URL } from '../../constants/constants';
import { AppDispatch, AppThunk } from '../../types';
import { IForgotPassword, IResetPassword } from '../../types/data';

export const POST_FORGOT_PASSWORD_REQUEST = 'POST_FORGOT_PASSWORD_REQUEST';
export const POST_FORGOT_PASSWORD_SUCCESS = 'POST_FORGOT_PASSWORD_SUCCESS';
export const POST_FORGOT_PASSWORD_FAILED = 'POST_FORGOT_PASSWORD_FAILED';
export const POST_RESET_PASSWORD_REQUEST = 'POST_RESET_PASSWORD_REQUEST';
export const POST_RESET_PASSWORD_SUCCESS = 'POST_RESET_PASSWORD_SUCCESS';
export const POST_RESET_PASSWORD_FAILED = 'POST_RESET_PASSWORD_FAILED';

export const forgotPasswordRequest =
  (email: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch({ type: POST_FORGOT_PASSWORD_REQUEST });

    fetch(`${URL}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((response) => checkResponse(response))
      .then((data: IForgotPassword) => {
        dispatch({
          type: POST_FORGOT_PASSWORD_SUCCESS,
          success: data.success,
        });
      })
      .catch((error) => {
        dispatch({ type: POST_FORGOT_PASSWORD_FAILED });
        console.log(error);
      });
  };

export const resetPasswordRequest =
  (password: string, token: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch({ type: POST_RESET_PASSWORD_REQUEST });

    fetch(`${URL}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        password,
        token,
      }),
    })
      .then((response) => checkResponse(response))
      .then((data: IResetPassword) => {
        console.log(data);
        dispatch({
          type: POST_RESET_PASSWORD_SUCCESS,
          success: data.success,
        });
      })
      .catch((error) => {
        dispatch({
          type: POST_RESET_PASSWORD_FAILED,
        });

        console.log(error);
      });
  };
