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
  totalCost = 0;
  maxQuantity = 0;
  addProductForm: FormGroup;
  orderId: any;
  date = new Date();
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
    this.getOrderId();
    this.selectedProducts.forEach(x => this.totalCost += x.quantity * x.product.price);
  }
  initForm(): void {
    this.form = new FormGroup({
      customer: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required)
    });
    this.addProductForm = new FormGroup({
      product: new FormControl('', Validators.required),
      quantity: new FormControl('', [Validators.required,
        Validators.min(1)])
    });
    this.addProductForm.controls.product.valueChanges.subscribe(value =>
    {
      this.maxQuantity = this.products.filter(product => product.id == value)[0].quantity;
      this.addProductForm.controls.quantity.setValidators([Validators.required,
      Validators.min(1), Validators.max(this.maxQuantity)]);
      this.addProductForm.controls.quantity.setValue(1);
    } );
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
  getOrderId(){
    this.orderService.getLastOrderId().subscribe(value => this.orderId = value + 1);
  }
    addToSelectedProducts(){
    const product = this.products.filter(product => product.id == this.addProductForm.get('product').value)[0];
    this.selectedProducts = this.selectedProducts.filter(product => product.productId != this.addProductForm.get('product').value);
    const productOrders: ProductOrders = {
        product,
        productId: this.addProductForm.get('product').value,
        quantity: this.addProductForm.get('quantity').value
      } as ProductOrders;
    this.selectedProducts.push(productOrders);
    this.calculateTotalCost();
    this.datasource = new MatTableDataSource<ProductOrders>(this.selectedProducts);
    }
  calculateTotalCost(){
    this.totalCost = 0;
    this.selectedProducts.forEach(product => this.totalCost += product.quantity * product.product.price);

  }
  delete(product: ProductOrders) {
    this.selectedProducts = this.selectedProducts.filter(value => {
      return value !== product;
    });
    this.calculateTotalCost();
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
