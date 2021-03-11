import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../../../models/customer';
import {Product} from '../../../models/product';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {OrderService} from '../../../services/order.service';
import {CustomerServiceService} from '../../../services/customer.service';
import {MatTableDataSource} from '@angular/material/table';
import {ProductOrders} from '../../../models/product-orders';
import {ProductService} from '../../../services/product.service';
import {Store} from '@ngrx/store';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  form: FormGroup;
  customers: Customer[];
  products: Product[];
  status: string[] = [
    'New', 'Paid', 'Shipped', 'Delivered', 'Closed'
  ];
  selectedProducts: ProductOrders[] = [];
  myColor = 'white';
  datasource: MatTableDataSource<ProductOrders>;
  displayedColumns: string[] = ['name', 'productCategory', 'productSize', 'price', 'quantity'];
  @Output() addProduct: EventEmitter<any> = new EventEmitter();
  totalCost = 0;
  constructor(
    private store: Store<{productOrders}>,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private productService: ProductService,
    private customerService: CustomerServiceService,
    private location: Location,
    private snackBar: MatSnackBar) {
    this.initForm();
  }
  ngOnInit(): void {
    this.getCustomers();
    this.getProducts();
    this.selectedProducts.forEach(x => this.totalCost += x.quantity * x.product.price);
  }
  initForm(): void {
    this.form = new FormGroup({
      customer: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      product: new FormControl('', Validators.required),
      quantity: new FormControl('', [Validators.required,
      Validators.min(1)]),
      comment: new FormControl('', Validators.required)
    });
  }
  getCustomers(){
    this.customerService.getCustomers()
      .subscribe((customers) => {
          this.customers = customers;
          console.log(this.customers);
        },
        (error => {
          console.error('error caught in component');
          throw error;
        }));
  }
  getProducts(){
    this.productService.getProducts()
      .subscribe((products) => {
          this.products = products;
          console.log(this.products);
        },
        (error => {
          console.error('error caught in component');
          throw error;
        }));
  }
  cancel() {
    this.location.back();
  }
    addToSelectedProducts(){
    const product = this.products.filter(product => product.id == this.form.get('product').value)[0];
    console.log(product);
    const productOrders: ProductOrders = {
        product,
        productId: this.form.get('product').value,
        quantity: this.form.get('quantity').value
      } as ProductOrders;
    this.totalCost += productOrders.quantity * productOrders.product.price;
    this.selectedProducts.push(productOrders);
    this.datasource = new MatTableDataSource<ProductOrders>(this.selectedProducts);
    }

  add() {
    const orders: { productId: number, quantity: number }[] = [];
    this.selectedProducts.forEach(value => orders.push({productId: value.product.id, quantity: value.quantity}) );
    const productOrders = {
      customerId: this.form.get('customer').value,
      status: this.form.get('status').value,
      productsDto: orders,
      comment: this.form.get('comment').value
    };
    console.log(productOrders);
    this.orderService.addOrder(productOrders)
      .subscribe(() => this.cancel(),
        error => this.snackBar.open(error.error, 'Ok', {duration: 4000}));
  }
}
