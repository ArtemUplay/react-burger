import { BurgerConstructorReducer } from './burger-constuctor';
import { BurgerIngredientsReducer } from './burger-ingredients';
import { ingredientsDetailsReducer } from './ingredient-details';
import { orderDetailsReducer } from './order-details';
import { profilePageReducer } from './profile';
import { combineReducers } from 'redux';
import { resetPasswordReducer } from './reset-password';
import { feedReducer } from './feed';
import { orderItemDetailsReducer } from './order-item-details';
import { ordersHistoryReducer } from './orders-history';

export const rootReducer = combineReducers({
  burgerIngredients: BurgerIngredientsReducer,
  burgerConstructor: BurgerConstructorReducer,
  ingredientDetails: ingredientsDetailsReducer,
  orderDetails: orderDetailsReducer,
  profile: profilePageReducer,
  resetPassword: resetPasswordReducer,
  feed: feedReducer,
  orderItemDetails: orderItemDetailsReducer,
  ordersHistory: ordersHistoryReducer,
});
