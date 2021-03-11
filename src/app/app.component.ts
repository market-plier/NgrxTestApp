import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public route: ActivatedRoute) {

  }


  title = 'OrdersApp';
  links = [
    { title: 'Orders', fragment: 'orders' },
    { title: 'Products', fragment: 'products' },
    { title: 'Customers', fragment: 'customers' }
  ];
}
