import {ProductOrders} from './product-orders';

export interface OrderToUpdate{
  id?: number;
  customerId?: number;
  status?: string;
  productsDto?: ProductOrders[];
  comment?: string;
}
