import { createReducer, on} from '@ngrx/store';
import {ProductOrders} from '../models/product-orders';
import {addProduct} from './products.actions';

export const initialState: ReadonlyArray<ProductOrders> = [];

export const _productsReducer = createReducer(
  initialState,
  on(addProduct, (state, { productOrder }) => [...state, productOrder])
);

export function productsReducer(state, action) {
  return _productsReducer(state, action);
}
