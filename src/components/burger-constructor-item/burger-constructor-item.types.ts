import { IIBurgerConstructorIngredient } from '../burger-constructor/burger-constructor.types';

export interface IBurgerConstructorItemProps {
  item: IIBurgerConstructorIngredient;
  uniqueId: string;
}

export interface IBurgerConstructorDropItem {
  ingredientId: string;
  index: string;
  ingredientIndexArray: number;
}
