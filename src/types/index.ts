import { Action, ActionCreator, AnyAction } from 'redux';
import { store } from '..';
import { TBurgerConstructorActions } from '../services/types/burger-contructor';
import { TBurgerIngredientsActions } from '../services/types/burger-ingredients';
import { TWsFeedConnectionActions } from '../services/types/feed';
import { TIngredientDetailsActions } from '../services/types/ingredient-details';
import { TLoginActions } from '../services/types/login';
import { TOrderDetailsActions } from '../services/types/order-details';
import { TOrderItemDetailsActions } from '../services/types/order-item-details';
import { TOrdersHistoryActions } from '../services/types/orders-history';
import { TProfileActions } from '../services/types/profile';
import { TRegisterActions } from '../services/types/register';
import { TResetPasswordActions } from '../services/types/reset-password';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions =
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TWsFeedConnectionActions
  | TIngredientDetailsActions
  | TLoginActions
  | TOrderDetailsActions
  | TOrderItemDetailsActions
  | TOrdersHistoryActions
  | TProfileActions
  | TRegisterActions
  | TResetPasswordActions;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
