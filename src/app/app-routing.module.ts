import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrdersListComponent} from './components/order/orders-list/orders-list.component';
import {ProductsComponent} from './components/product/products-list/products.component';
import {CustomerComponent} from './components/customer/customer-list/customer.component';
import {CreateProductComponent} from './components/product/create-product/create-product.component';
import {CreateOrderComponent} from './components/order/create-order/create-order.component';
import {CreateCustomerComponent} from './components/customer/create-customer/create-customer.component';
import {UpdateOrderComponent} from './components/order/update-order/update-order.component';
import {UpdateProductComponent} from './components/product/update-product/update-product.component';

const routes: Routes = [
  {path: '', redirectTo: 'orders', pathMatch: 'full'},
  {path: 'orders', component: OrdersListComponent},
  {path: 'orders/create', component: CreateOrderComponent},
  {path: 'orders/:id', component: UpdateOrderComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/create', component: CreateProductComponent},
  {path: 'products/:id', component: UpdateProductComponent},
  {path: 'customers', component: CustomerComponent},
  {path: 'customers/create', component: CreateCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
