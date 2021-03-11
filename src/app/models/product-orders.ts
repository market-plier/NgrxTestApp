import {Product} from './product';

export interface ProductOrders {
  product?: Product;
  quantity?: number;
  productId?: number;
}
