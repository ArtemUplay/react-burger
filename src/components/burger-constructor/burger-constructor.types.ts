import { IIngredient } from '../burger-ingredients/burger-ingredients.types';

export interface IIBurgerConstructorIngredient extends IIngredient {
  uniqueId: string;
}
