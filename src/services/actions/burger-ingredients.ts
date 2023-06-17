import { checkResponse } from '../../components/utils/utils';
import { URL } from '../../constants/constants';
import { AppDispatch } from '../../types';
import { IIngredients } from '../../types/data';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST' as const;
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS' as const;
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED' as const;

export const getItems = () => (dispatch: AppDispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });

  fetch(`${URL}/ingredients`)
    .then((response) => checkResponse(response))
    .then((data: IIngredients) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      });

      console.log(error);
    });
};
