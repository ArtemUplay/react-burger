import { checkResponse } from '../../components/utils/utils';

export const GET_ITEMS_REQUEST = 'GET_INGRIENTS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_INGRIENTS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_INGRIENTS_FAILED';

export function getItems() {
  return function (dispatch) {
    dispatch({ type: GET_ITEMS_REQUEST });

    fetch('https://norma.nomoreparties.space/api/ingredients')
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
