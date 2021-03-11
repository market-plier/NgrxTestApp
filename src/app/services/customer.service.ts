import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Customer} from '../models/customer';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private customerUrl = 'http://localhost:5000/api/customer';

  constructor(private http: HttpClient) {
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerUrl)
      .pipe(
        catchError((err) => {
          console.log('error caught in service');
          console.error(err);
          return throwError(err);
        }));
  }

  addCustomer(customer: Customer): Observable<Customer> {
    console.log(customer);
    return this.http.post<Product>(this.customerUrl, customer, this.httpOptions).pipe(
      catchError((err) => {
        console.log('error caught in service');
        console.error(err);
        return throwError(err);
      })
    );
  }

  deleteCustomer(id: number) {
    return this.http.delete<Customer>(this.customerUrl + '/' + id)
      .pipe(
        catchError((err) => {
          console.log('error caught in service');
          console.error(err);
          return throwError(err);
        }));
  }
}
