import {
  checkResponse,
  collectIngredientsInArray,
} from '../../components/utils/utils';
import { URL } from '../../constants/constants';

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';
export const DELETE_ORDER_NUMBER = 'DELETE_ORDER_NUMBER';

export function getOrderNumber(burgerConstructorIngredients, accessToken) {
  return function (dispatch) {
    dispatch({ type: GET_ORDER_NUMBER_REQUEST });

    fetch(`${URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: accessToken,
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
}
