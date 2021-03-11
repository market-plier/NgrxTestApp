import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Order} from '../models/order';
import {OrderToUpdate} from '../models/order-to-update';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  get orderToUpdate(): Order {
    return this._orderToUpdate;
  }

  set orderToUpdate(value: Order) {
    this._orderToUpdate = value;
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private orderUrl = 'http://localhost:5000/api/order';
  private _orderToUpdate: Order;
  constructor(private http: HttpClient) {
  }


  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderUrl)
      .pipe(
        catchError((err) => {
          console.log('error caught in service');
          console.error(err);
          return throwError(err);
        }));
  }

  getOrder(id: number): Observable<OrderToUpdate> {
    const url = `${this.orderUrl}/${id}`;
    return this.http.get<Order>(url).pipe(
      catchError((err) => {
        console.log('error caught in service');
        console.error(err);
        return throwError(err);    // Rethrow it back to component
      }));
  }

  addOrder(order: any): Observable<Order> {
    console.log(order);
    return this.http.post<Order>(this.orderUrl, order, this.httpOptions).pipe(
      catchError((err) => {
        console.log('error caught in service');
        console.error(err);
        return throwError(err);    // Rethrow it back to component
      })
    );
  }
  updateOrder(order: any): Observable<Order> {
    console.log(order);
    return this.http.put<Order>(`${this.orderUrl}/${order.id}`, order, this.httpOptions).pipe(
      catchError((err) => {
        console.log('error caught in service');
        console.error(err);
        return throwError(err);    // Rethrow it back to component
      })
    );
  }
}
