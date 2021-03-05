import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private store: Store,
    public route: ActivatedRoute) {

  }


  title = 'OrdersApp';
  links = [
    { title: 'Orders', fragment: 'orders' },
    { title: 'Products', fragment: 'products' },
    { title: 'Customers', fragment: 'customers' }
  ];
}
