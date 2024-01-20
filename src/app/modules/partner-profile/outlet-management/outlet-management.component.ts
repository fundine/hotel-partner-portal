import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outlet-management',
  templateUrl: './outlet-management.component.html',
  styleUrls: ['./outlet-management.component.scss']
})
export class OutletManagementComponent implements OnInit {

  alertSuccess: boolean = false;
  formChangeWarningDialog: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) { }


  // outlet form
  outletInfoForm = this.fb.group({
    unitName: ['', [Validators.required, Validators.maxLength(50)]],
    unitType: ['', [Validators.required, Validators.maxLength(50)]],
    unitCategory: ['Restaurant'],
    unitLocation: ['', [Validators.required]],
    openingTime: ['', [Validators.required]],
    closingTime: ['', [Validators.required]],




    categoryTypeId: [''],
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
    return { 'is-invalid': this.outletInfoForm?.get(controlName)?.invalid && this.outletInfoForm?.get(controlName)?.touched };
  }
  get itemInfo() {
    return this.outletInfoForm;
  }

  ngOnInit(): void {

  }

  // coupon save
  onUpdateOutletInfo() {
    if (this.outletInfoForm.valid) {
      this.alertSuccess = true;
    }
    else {
      this.outletInfoForm.markAllAsTouched();
    }
    this.alertSuccess = false;
  }

  // return to home
  onCancelClick() {
    if (this.outletInfoForm.dirty) {
      this.formChangeWarningDialog = true;
    }
    else {
      this.alertSuccess = false;
      this.outletInfoForm.reset();
      this.router.navigate(['/core']);
    }
  }
  onCancelClearChanges() {
    this.formChangeWarningDialog = false;
  }
  onBackConfirmClick() {
    this.alertSuccess = false;
    this.outletInfoForm.reset();
    this.router.navigate(['/core']);
  }
}