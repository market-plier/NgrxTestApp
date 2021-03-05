import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Order} from '../models/Order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private orderUrl = 'http://localhost:5000/api/order';

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

  getOrder(id: number): Observable<Order> {
    const url = `${this.orderUrl}/${id}`;
    return this.http.get<Order>(url).pipe(
      catchError((err) => {
        console.log('error caught in service');
        console.error(err);
        return throwError(err);    // Rethrow it back to component
      }));
  }

  addOrder(formData: any): Observable<Order> {
    console.log(formData);
    return this.http.post<Order>(this.orderUrl, formData, this.httpOptions).pipe(
      catchError((err) => {
        console.log('error caught in service');
        console.error(err);
        return throwError(err);    // Rethrow it back to component
      })
    );
  }


}
