import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guestprofile',
  templateUrl: './guestprofile.component.html',
  styleUrls: ['./guestprofile.component.scss']
})
export class GuestprofileComponent implements OnInit {


  alertSuccess: boolean = false;
  formChangeWarningDialog: boolean = false;
  adultCountOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  childrenCountOptions: number[] = Array.from({ length: 11 }, (_, i) => i + 0);
  roomCountOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

  constructor(private fb: FormBuilder, private router: Router) { }


  // checkin form
  guestCheckInForm = this.fb.group({
    guestFullName: ['', [Validators.required, Validators.maxLength(100)]],
    totalAdults: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    totalChildren: ['0', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    totalRooms: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    country: ['', [Validators.required]],
    countryCode: ['', [Validators.required]],
    whatsappNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    guestEmail: ['', [Validators.required, Validators.email]],
    roomCategory: ['', [Validators.required]],
    roomNumber: ['', [Validators.required]],
    checkinTime: ['', [Validators.required]],
    checkoutTime: ['', [Validators.required]],
    los: [''],
    isBreakfastIncluded: [true],
    isLunchIncluded: [false],
    isDinnerIncluded: [false],
  }, { validator: this.dateRangeValidator('checkinTime', 'checkoutTime') })

  controlClass(controlName: string) {
    return { 'is-invalid': this.guestCheckInForm?.get(controlName)?.invalid && this.guestCheckInForm?.get(controlName)?.touched };
  }
  get itemInfo() {
    return this.guestCheckInForm;
  }


  ngOnInit(): void {

  }

  // date range validation
  dateRangeValidator(checkinControlName: string, checkoutControlName: string): ValidatorFn {
    return (group: AbstractControl): { [key: string]: any } | null => {
      const checkinTime = group.get(checkinControlName);
      const checkoutTime = group.get(checkoutControlName);
      if (checkinTime && checkoutTime && checkinTime.value && checkoutTime.value && checkinTime.value > checkoutTime.value) {
        checkoutTime.setErrors({ 'dateRangeInvalid': true });
        return { 'dateRangeInvalid': true };
      }
      return null;
    };
  }

  // checkin save
  onCheckInGuest() {
    // console.log('guest info', this.itemInfo)
    if (this.guestCheckInForm.valid) {
      this.alertSuccess = true;
      console.log('guest info', this.itemInfo)
    }
    else {
      this.guestCheckInForm.markAllAsTouched();
    }
    this.alertSuccess = false;
  }
}
