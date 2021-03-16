import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../services/order.service';
import {CustomerServiceService} from '../../../services/customer.service';
import {Location} from '@angular/common';
import {ProductService} from '../../../services/product.service';

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
  id: number;
  productDate: Date = new Date();
  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private productService: ProductService) {
    this.initForm();
  }
 integer(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const error: ValidationErrors = { integer: true };
      if (control.value && control.value !== parseInt(control.value, 10)) {
        control.setErrors(error);
        return error;
      }
      control.setErrors(null);
      return null;
    };
  }
  ngOnInit(): void {
    this.getProductId();
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
        Validators.max(100000000),
      this.integer()]),
      price: new FormControl('', [Validators.required,
        Validators.min(0.01),
        Validators.max(100000000)])
    });
  }
  cancel() {
    this.location.back();
  }
  getProductId(){
    this.productService.getLastProductId().subscribe(value => this.id = value + 1);
  }
    add() {
    const product = {
      ...this.form.value,
    };
    this.productService.addProduct(product)
      .subscribe(() =>  this.router.navigateByUrl('/products'));
    }
}
