import { wsFeedActions, wsOrdersHistoryActions } from '../..';

export type TWsActions = typeof wsFeedActions | typeof wsOrdersHistoryActions;

export interface IWsAction {
  type: string;
  accessToken?: string;
  success?: boolean;
}
