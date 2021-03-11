import {Component, OnInit} from '@angular/core';
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
import {OrderToUpdate} from '../../../models/order-to-update';
import {addProduct} from '../../../state/products.actions';

@Component({
  selector: 'app-create-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {
  form: FormGroup;
  customers: Customer[];
  products: Product[];
  status: string[] = [
    'New', 'Paid', 'Shipped', 'Delivered', 'Closed'
  ];
  selectedProducts: ProductOrders[] = [];
  myColor = 'white';
  datasource: MatTableDataSource<ProductOrders>;
  displayedColumns: string[] = ['name', 'productCategory', 'productSize', 'price', 'quantity', 'column-delete'];
  orderToUpdate: OrderToUpdate;
  totalCost = 0;

  constructor(
    private store: Store<{productOrders}>,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private productService: ProductService,
    private customerService: CustomerServiceService,
    private location: Location) {
    this.initForm();
  }
  ngOnInit(): void {
    this.getCustomers();
    this.getProducts();
    this.getOrderToUpdate();
    this.selectedProducts.forEach(x => this.totalCost += x.quantity * x.product.price);

  }
  initForm(): void {
    this.form = new FormGroup({
      customer: new FormControl( '', [Validators.required]),
      status: new FormControl( '', [Validators.required]),
      product: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required,
      Validators.min(1)]),
      comment: new FormControl('', Validators.required)
    });
  }
  getOrder(id: number){
    this.orderService.getOrder(id).subscribe(value => {
      console.log(value);
      this.form.controls.customer.setValue(value.customerId.toString());
      this.form.controls.status.setValue(value.status);
      this.form.controls.comment.setValue(value.comment);
      this.orderToUpdate = value;
      console.log(this.orderToUpdate);
      value.productsDto.forEach(x => this.addToSelectedProducts(x.productId, x.quantity));
      this.datasource = new MatTableDataSource<ProductOrders>(this.selectedProducts);
    });
  }
  getOrderToUpdate(){
    this.route.params.subscribe(params => {
      this.getOrder(params.id);
      }
    );

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
  getProductsToState(){
    const product = this.products.filter(product => product.id == this.form.get('product').value)[0];
    const productOrder: ProductOrders = {
      product,
      quantity: this.form.get('quantity').value
    };
    this.store.dispatch(addProduct({productOrder}));
  }
    addToSelectedProducts(id: number, quantity: number){
    const product = this.products.filter(product => product.id == id)[0];
    console.log(product);
    const productOrders: ProductOrders = {
        product,
        productId: id,
        quantity
      } as ProductOrders;
    this.totalCost += productOrders.quantity * productOrders.product.price;
    this.selectedProducts.push(productOrders);
    this.datasource = new MatTableDataSource<ProductOrders>(this.selectedProducts);
    }

  update() {
    const orders: { productId: number, quantity: number }[] = [];
    this.selectedProducts.forEach(value => orders.push({productId: value.product.id, quantity: value.quantity}) );
    const productOrders = {
      customerId: this.form.get('customer').value,
      status: this.form.get('status').value,
      productsDto: orders,
      comment: this.form.get('comment').value,
      id: +this.route.snapshot.paramMap.get('id')
    };
    console.log(productOrders);
    this.orderService.updateOrder(productOrders)
      .subscribe(() => this.cancel());
  }

  delete(product: ProductOrders) {
    this.selectedProducts = this.selectedProducts.filter(value => {
      return value !== product;
    });
    this.datasource = new MatTableDataSource<ProductOrders>(this.selectedProducts);
  }
}
