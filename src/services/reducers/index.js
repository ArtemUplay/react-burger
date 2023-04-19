import { BurgerConstructorReducer } from './burger-constuctor';
import { BurgerIngredientsReducer } from './burger-ingredients';
import { ingredientsDetailsReducer } from './ingredient-details';
import { orderDetailsReducer } from './order-details';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  burgerIngredients: BurgerIngredientsReducer,
  burgerConstructor: BurgerConstructorReducer,
  ingredientDetails: ingredientsDetailsReducer,
  orderDetails: orderDetailsReducer,
});
