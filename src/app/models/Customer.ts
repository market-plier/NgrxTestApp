import {Order} from "./Order";

export interface Customer {
  id?: number;
  name?: string;
  address?: string;
  orderedCost?: number;
  ordersCount?: number;
  orders?: Order[];
}
