import {ProductOrders} from '../models/product-orders';

export interface AppState {
  productOrders: ReadonlyArray<ProductOrders>;
}
