import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Product} from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private orderUrl = 'http://localhost:5000/api/product';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.orderUrl)
      .pipe(
        catchError((err) => {
          console.log('error caught in service');
          console.error(err);
          return throwError(err);    // Rethrow it back to component
        }));
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.orderUrl}/${id}`)
      .pipe(
        catchError((err) => {
          console.log('error caught in service');
          console.error(err);
          return throwError(err);    // Rethrow it back to component
        }));
  }
  addProduct(product: Product): Observable<Product> {
    console.log(product);
    return this.http.post<Product>(this.orderUrl, product, this.httpOptions).pipe(
      catchError((err) => {
        console.log('error caught in service');
        console.error(err);
        return throwError(err);
      })
    );
  }
  updateProduct(product: Product, id: number): Observable<Product> {
    console.log(product);
    return this.http.put<Product>(this.orderUrl + '/' + id, product, this.httpOptions).pipe(
      catchError((err) => {
        console.log('error caught in service');
        console.error(err);
        return throwError(err);
      })
    );
  }
  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(this.orderUrl + '/' + id)
      .pipe(
        catchError((err) => {
          console.log('error caught in service');
          console.error(err);
          return throwError(err);    // Rethrow it back to component
        }));
  }
}
