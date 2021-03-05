import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/OrderService';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {Order} from '../../models/Order';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  myColor = 'white';
  datasource: MatTableDataSource<Order>;
  orders: Order[];
  displayedColumns: string[] = ['id', 'customerName', 'customerAddress', 'totalCost', 'status'];

  constructor(private orderService: OrderService,
              private router: Router) { }

  ngOnInit(): void {
    this.getOrders();
  }

  route(id: number) {
    this.router.navigate([`/order/${id}`]);
  }
  getOrders() {
    this.orderService.getOrders()
      .subscribe((orders) => {
          this.orders = orders;
          console.log(this.orders);
          this.datasource = new MatTableDataSource(orders);
        },
        (error => {
          console.error('error caught in component');
          throw error;
        }));
  }
}
