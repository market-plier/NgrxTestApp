import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CustomerServiceService} from '../../../services/customer.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  form: FormGroup;


  constructor(private route: ActivatedRoute,
              private location: Location,
              private customerService: CustomerServiceService) {
    this.initForm();
  }

  ngOnInit(): void {
  }
  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255)]),
      address: new FormControl('', [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255)])
    });
  }
  cancel() {
    this.location.back();
  }

  add() {
    const customer = {
      ...this.form.value,
    };
    this.customerService.addCustomer(customer)
      .subscribe(() => this.cancel());
  }
}
