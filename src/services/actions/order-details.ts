import { IIBurgerConstructorIngredient } from '../../components/burger-constructor/burger-constructor.types';
import {
  checkResponse,
  collectIngredientsInArray,
} from '../../components/utils/utils';
import { URL } from '../../constants/constants';
import { AppDispatch, AppThunk } from '../../types';

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST' as const;
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS' as const;
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED' as const;
export const DELETE_ORDER_NUMBER = 'DELETE_ORDER_NUMBER' as const;

export const getOrderNumber: AppThunk =
  (
    burgerConstructorIngredients: Array<IIBurgerConstructorIngredient>,
    accessToken: string
  ) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: GET_ORDER_NUMBER_REQUEST });

    fetch(`${URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      body: JSON.stringify({
        ingredients: [
          ...collectIngredientsInArray(burgerConstructorIngredients),
        ],
      }),
    })
      .then((response) => checkResponse(response))
      .then((data) => {
        const orderNumber = data.order.number;

        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          number: orderNumber,
        });
      })
      .catch((error) => {
        console.log(error);

        dispatch({
          type: GET_ORDER_NUMBER_FAILED,
        });
      });
  };
