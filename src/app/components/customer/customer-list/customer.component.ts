import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Order} from '../../../models/order';
import {Router} from '@angular/router';
import {Customer} from '../../../models/customer';
import {CustomerServiceService} from '../../../services/customer.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../confirmation-dialog/confirmation-dialog.component';

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

  constructor(private dialog: MatDialog,
              private customerService: CustomerServiceService,
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
  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.delete(id);
      }
    });
  }
}
