import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../services/order.service';
import {CustomerServiceService} from '../../../services/customer.service';
import {Location} from '@angular/common';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  form: FormGroup;
  size: string[] = [
    'Big', 'Medium', 'Small'
  ];
  category: string[] = [
    'Products', 'Drinks', 'Deserts'
  ];
  id;
  productDate: Date = new Date();
  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private customerService: CustomerServiceService,
              private productService: ProductService) {
    this.initForm();
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getProduct();
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

  getProduct(){
    this.productService.getProduct(this.id).subscribe(value =>
      {
        this.form.controls.name.setValue(value.name);
        this.form.controls.price.setValue(value.price);
        this.form.controls.quantity.setValue(value.quantity);
        this.form.controls.productSize.setValue(value.productSize);
        this.form.controls.productCategory.setValue(value.productCategory);
        this.productDate = value.date;
      }
    );
  }
  update() {
    const product = {
      ...this.form.value,
    };
    this.productService.updateProduct(product, this.id)
      .subscribe(() =>  this.router.navigateByUrl('/products'));
  }
}
