import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './Components/home-page/home-page.component';
import {CreateOrderComponent} from './Components/create-order/create-order.component';
import {ProductsComponent} from './Components/products/products.component';
import {CreateProductComponent} from './Components/create-product/create-product.component';
import {CustomerComponent} from './Components/customer/customer.component';
import {CreateCustomerComponent} from './Components/create-customer/create-customer.component';

const routes: Routes = [
  {path: '', redirectTo: 'orders', pathMatch: 'full'},
  {path: 'orders', component: HomePageComponent},
  {path: 'orders/create', component: CreateOrderComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/create', component: CreateProductComponent},
  {path: 'customers', component: CustomerComponent},
  {path: 'customers/create', component: CreateCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
