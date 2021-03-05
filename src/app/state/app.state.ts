import {ProductOrders} from '../models/ProductOrders';

export interface AppState {
  productOrders: ReadonlyArray<ProductOrders>;
}
