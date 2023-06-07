import { IIngredient } from '../../components/burger-ingredients/burger-ingredients.types';
import {
  DELETE_CURRENT_INGREDIENT,
  SET_CURRENT_INGREDIENT,
} from '../actions/ingredient-details';

export interface ISetCurrentIngredientAction {
  readonly type: typeof SET_CURRENT_INGREDIENT;
  currentIngredient: IIngredient;
}

export interface IDeleteCurrentIngredient {
  readonly type: typeof DELETE_CURRENT_INGREDIENT;
}

export type TIngredientDetailsActions =
  | ISetCurrentIngredientAction
  | IDeleteCurrentIngredient;

export interface IIngredientDetailsState {
  currentIngredient: IIngredient | null;
}
