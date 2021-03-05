import { createAction, props } from '@ngrx/store';

export const addProduct = createAction(
  '[ProductOrders List] Add Product',
  props<{ productOrder }>()
);
