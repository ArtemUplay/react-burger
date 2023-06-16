import { store } from '..';
import { TBurgerConstructorActions } from '../services/types/burger-contructor';
import { TBurgerIngredientsActions } from '../services/types/burger-ingredients';
import { IWsFeedActions } from '../services/types/feed';
import { TIngredientDetailsActions } from '../services/types/ingredient-details';
import { TLoginActions } from '../services/types/login';
import { TOrderDetailsActions } from '../services/types/order-details';
import { TOrderItemDetailsActions } from '../services/types/order-item-details';
import { IWsOrdersHistoryActions } from '../services/types/orders-history';
import { TProfileActions } from '../services/types/profile';
import { TRegisterActions } from '../services/types/register';
import { TResetPasswordActions } from '../services/types/reset-password';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions =
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TIngredientDetailsActions
  | TLoginActions
  | TOrderDetailsActions
  | TOrderItemDetailsActions
  | TProfileActions
  | TRegisterActions
  | TResetPasswordActions
  | IWsFeedActions
  | IWsOrdersHistoryActions;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;

export type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  TApplicationActions
>;
