import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../../models/Customer';
import {Product} from '../../models/Product';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../services/OrderService';
import {CustomerServiceService} from '../../services/customer-service.service';
import {Location} from '@angular/common';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {


  form: FormGroup;
  size: string[] = [
    'Big', 'Medium', 'Small'
  ];
  category: string[] = [
    'Products', 'Drinks', 'Deserts'
  ];
  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private customerService: CustomerServiceService,
              private location: Location,
              private productService: ProductService) {
    this.initForm();
  }

  ngOnInit(): void {
  }
  initForm(): void {
    this.form = new FormGroup({
      productSize: new FormControl('', Validators.required),
      productCategory: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255)]),
      quantity: new FormControl('', [Validators.required,
        Validators.min(1),
        Validators.max(100000000)]),
      price: new FormControl('', [Validators.required,
        Validators.min(0.01),
        Validators.max(100000000)])
    });
  }
  cancel() {
    this.location.back();
  }

  add() {
    const product = {
      ...this.form.value,
    };
    this.productService.addProduct(product)
      .subscribe(() => this.cancel());
  }
}
