import { checkResponse } from '../../components/utils/utils';
import { URL } from '../../constants/constants';

export const GET_ITEMS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_INGREDIENTS_FAILED';

export function getItems() {
  return function (dispatch) {
    dispatch({ type: GET_ITEMS_REQUEST });

    fetch(`${URL}/ingredients`)
      .then((response) => checkResponse(response))
      .then((data) => {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: data.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ITEMS_FAILED,
        });
        console.log(error);
      });
  };
}
