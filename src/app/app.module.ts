import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { MyCounterComponent } from './my-counter/my-counter.component';
import {environment} from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {CreateCustomerComponent} from './components/customer/create-customer/create-customer.component';
import {CreateProductComponent} from './components/product/create-product/create-product.component';
import {CustomerComponent} from './components/customer/customer-list/customer.component';
import {ProductsComponent} from './components/product/products-list/products.component';
import {CreateOrderComponent} from './components/order/create-order/create-order.component';
import {OrdersListComponent} from './components/order/orders-list/orders-list.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRippleModule} from '@angular/material/core';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {FlexModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {productsReducer} from './state/products.reducer';
import {UpdateOrderComponent} from './components/order/update-order/update-order.component';
import {UpdateProductComponent} from './components/product/update-product/update-product.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [AppComponent,
    OrdersListComponent,
    CreateOrderComponent,
    ProductsComponent,
    CreateProductComponent,
    CustomerComponent,
    UpdateOrderComponent,
    UpdateProductComponent,
    ConfirmationDialogComponent,
    CreateCustomerComponent,
    MyCounterComponent],
  imports: [BrowserModule,
    StoreModule.forRoot({count: counterReducer, productOrders: productsReducer}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    FlexModule,
    MatInputModule,
    MatTableModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    MatRippleModule,
    MatToolbarModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    NgbModule, MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
