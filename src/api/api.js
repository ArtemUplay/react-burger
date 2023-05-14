import { URL } from '../constants/constants';
import {
  collectIngredientsInArray,
  checkResponse,
} from '../components/utils/utils';

export const postOrder = async (
  burgerConstructorIngredients,
  dispatch,
  GET_ORDER_NUMBER
) => {
  const response = await fetch(`${URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      ingredients: [...collectIngredientsInArray(burgerConstructorIngredients)],
    }),
  });

  const data = await checkResponse(response);

  dispatch({
    type: GET_ORDER_NUMBER,
    number: data.order.number,
  });
};
