import {Order} from './order';

export interface Customer {
  id?: number;
  name?: string;
  address?: string;
  orderedCost?: number;
  orderCount?: number;
  orders?: Order[];
}
