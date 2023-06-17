import { checkResponse, removeBearer } from '../../components/utils/utils';
import { URL } from '../../constants/constants';
import { IRegisterFormData } from '../types/register';
import { AppDispatch, AppThunk } from '../../types';

export const POST_REGISTER_DATA_REQUEST = 'POST_REGISTER_DATA_REQUEST' as const;
export const POST_REGISTER_DATA_SUCCESS = 'POST_REGISTER_DATA_SUCCESS' as const;
export const POST_REGISTER_DATA_FAILED = 'POST_REGISTER_DATA_FAILED' as const;

export const sendRegisterData =
  (formData: IRegisterFormData): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch({ type: POST_REGISTER_DATA_REQUEST });
    fetch(`${URL}/auth/register`, {
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
        const refreshToken: string = responseData.refreshToken;

        localStorage.setItem('refreshToken', refreshToken);

        dispatch({
          type: POST_REGISTER_DATA_SUCCESS,
          accessToken: removeBearer(responseData.accessToken),
          success: responseData.success,
        });
      })
      .catch((error) => {
        dispatch({
          type: POST_REGISTER_DATA_FAILED,
        });

        console.log(error);
      });
  };
