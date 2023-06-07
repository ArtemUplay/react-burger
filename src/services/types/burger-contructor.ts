import { IIBurgerConstructorIngredient } from '../../components/burger-constructor/burger-constructor.types';
import {
  DELETE_CONSTRUCTOR_INGREDIENT,
  SET_CONSTRUCTOR_BUN,
  SET_CONSTRUCTOR_INGRIDIENT,
} from '../actions/burger-constructor';

export interface ISetConstructorBunAction {
  readonly type: typeof SET_CONSTRUCTOR_BUN;
  ingredient: IIBurgerConstructorIngredient;
}

export interface ISetConstructorIngredientAction {
  readonly type: typeof SET_CONSTRUCTOR_INGRIDIENT;
  indexArray: number;
  ingredient: IIBurgerConstructorIngredient;
}

export interface IDeleteConstructorIngredientAction {
  readonly type: typeof DELETE_CONSTRUCTOR_INGREDIENT;
  ingredientIndex: string;
}

export type TBurgerConstructorActions =
  | ISetConstructorBunAction
  | ISetConstructorIngredientAction
  | IDeleteConstructorIngredientAction;

export interface IBurgerConstructorState {
  burgerConstructorIngredients: Array<IIBurgerConstructorIngredient>;
}
