import { IIBurgerConstructorIngredient } from '../burger-constructor/burger-constructor.types';
import { IIngredient } from '../burger-ingredients/burger-ingredients.types';

export interface IBurgerConstructorItemProps {
  item: IIBurgerConstructorIngredient;
  uniqueId: string;
}

export interface IBurgerConstructorDropItem {
  ingredientId: string;
  index: string;
  ingredientIndexArray: number;
}

export interface IBurgerConstructorItem extends IIngredient {
  uniqueId: string;
}
