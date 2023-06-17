import { IIngredient } from '../components/burger-ingredients/burger-ingredients.types';
import { IOrder } from '../pages/feed/feed.types';

export interface IUser {
  readonly email: string;
  readonly name: string;
}

export interface IIngredients {
  readonly data: Array<IIngredient>;
  readonly success: boolean;
}

export interface ILogin {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly success: boolean;
  readonly user: IUser;
}

export interface IOrderDetailsNumber {
  readonly name: string;
  readonly order: IOrder;
  readonly success: boolean;
}

export interface IProfileLogOut {
  readonly message: string;
  readonly success: boolean;
}

export interface IProfilePatchData {
  readonly success: boolean;
  readonly user: IUser;
}

export interface IUpdateToken {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly success: boolean;
}

export interface IGetProfileData {
  readonly success: boolean;
  readonly user: IUser;
}

export interface ISendRegisterData {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly success: boolean;
  readonly user: IUser;
}

export interface IForgotPassword {
  readonly success: boolean;
  readonly message: string;
}

export interface IResetPassword {
  readonly message: string;
  readonly success: boolean;
}
