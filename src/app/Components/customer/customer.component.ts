import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Order} from '../../models/Order';
import {Product} from '../../models/Product';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {Customer} from '../../models/Customer';
import {CustomerServiceService} from '../../services/customer-service.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  myColor = 'white';
  datasource: MatTableDataSource<Order>;
  customers: Customer[];
  displayedColumns: string[] = ['name', 'address', 'ordersCount', 'orderedCost', 'column-delete'];

  constructor(private customerService: CustomerServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  route(id: number) {
    this.router.navigate([`/order/${id}`]);
  }
  getCustomers() {
    this.customerService.getCustomers()
      .subscribe((customers) => {
          this.customers = customers;
          console.log(this.customers);
          this.datasource = new MatTableDataSource(customers);
        },
        (error => {
          console.error('error caught in component');
          throw error;
        }));
  }

  delete(id: number) {
    this.customerService.deleteCustomer(id).subscribe((customer) => {
        console.log(customer);
        this.getCustomers();
      },
      (error => {
        console.error('error caught in component');
        throw error;
      }));
  }
}
