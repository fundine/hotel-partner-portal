import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discount-coupons',
  templateUrl: './discount-coupons.component.html',
  styleUrls: ['./discount-coupons.component.scss']
})
export class DiscountCouponsComponent implements OnInit {

  alertSuccess: boolean = false;
  formChangeWarningDialog: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) { }


  // discount coupon form
  discountCouponForm = this.fb.group({
    categoryTypeId: [''],
    discountType: ['', [Validators.required]],
    couponCode: ['', [Validators.required, Validators.maxLength(20)]],
    discountTitle: ['', [Validators.required, Validators.maxLength(30)]],
    discountAmount: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
    discountPercentage: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?%?$/)]],
    maxDiscountAmount: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
    minOrderValue: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
    validityStartsFrom: ['', [Validators.required]],
    validityEndTo: ['', [Validators.required]],
    customerType: ['', [Validators.required]],
    // allowedOutlets: [this.fb.array([]), [Validators.required]],
    allowedOutlets: [[], [Validators.required]],
    description: ['', [Validators.maxLength(200)]],
    isValid: [true],
    isDisabled: [false],
  })
  controlClass(controlName: string) {
    return { 'is-invalid': this.discountCouponForm?.get(controlName)?.invalid && this.discountCouponForm?.get(controlName)?.touched };
  }
  get itemInfo() {
    return this.discountCouponForm;
  }

  ngOnInit(): void {

  }

  // coupon save
  onSaveDiscountCoupon() {
    if (this.discountCouponForm.valid) {
      this.alertSuccess = true;
    }
    else {
      this.discountCouponForm.markAllAsTouched();
    }
    this.alertSuccess = false;
  }

  // return to home
  onCancelClick() {
    if (this.discountCouponForm.dirty) {
      this.formChangeWarningDialog = true;
    }
    else {
      this.alertSuccess = false;
      this.discountCouponForm.reset();
      this.router.navigate(['/core']);
    }
  }
  onCancelClearChanges() {
    this.formChangeWarningDialog = false;
  }
  onBackConfirmClick() {
    this.alertSuccess = false;
    this.discountCouponForm.reset();
    this.router.navigate(['/core']);
  }
}
