import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Order} from '../../models/Order';
import {OrderService} from '../../services/OrderService';
import {Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  myColor = 'white';
  datasource: MatTableDataSource<Order>;
  products: Product[];
  displayedColumns: string[] = ['name', 'productCategory', 'productSize', 'price', 'quantity', 'column-delete'];

  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  route(id: number) {
    this.router.navigate([`/order/${id}`]);
  }
  getProducts() {
    this.productService.getProducts()
      .subscribe((products) => {
          this.products = products;
          console.log(this.products);
          this.datasource = new MatTableDataSource(products);
        },
        (error => {
          console.error('error caught in component');
          throw error;
        }));
  }
  delete(id: number) {
    this.productService.deleteProduct(id).subscribe((product) => {
      console.log(this.products);
      this.getProducts();
    },
    (error => {
      console.error('error caught in component');
      throw error;
    }));
  }
}
