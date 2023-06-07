import { IOrder } from '../../pages/feed/feed.types';

export interface IOrderItemProps {
  path: string;
  item: IOrder;
  linkState: object;
}
