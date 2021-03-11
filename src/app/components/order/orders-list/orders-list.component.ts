import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../../services/order.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {Order} from '../../../models/order';

@Component({
  selector: 'app-home-page',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
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
    this.router.navigate([`/orders/${id}`]);
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
