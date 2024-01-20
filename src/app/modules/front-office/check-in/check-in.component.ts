import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-in',
  providers: [
    DatePipe
  ],
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {
  roomDetails = [
    {
      roomCategory: 'Super Deluxe Room',
      items: [
        {
          roomNumber: '2005',
          guestName: 'Vishnu Anandababu',
          roomName: 'Super Deluxe Room',
          checkInTime: 'Jan 12, 2024. 12:45 PM',
          checkOutTime: 'Jan 12, 2024. 11:00 AM',
          roomsOccupied: '1',
          adultsCount: '2',
          childCount: '1',
          totalNights: '2',
          guestPhoneNo: '+91 8089583858',
          guestEmail: 'vishnuanandababu@gmail.com'
        },
        {
          roomNumber: '2006',
          guestName: 'Ankush S',
          roomName: 'Super Deluxe Room',
          checkInTime: 'Jan 12, 2024. 12:45 PM',
          checkOutTime: 'Jan 12, 2024. 11:00 AM',
          roomsOccupied: '1',
          adultsCount: '2',
          childCount: '1',
          totalNights: '2',
          guestPhoneNo: '+91 8089583858',
          guestEmail: 'vishnuanandababu@gmail.com'
        }
      ]
    },
    {
      roomCategory: 'Diplomatic Suite',
      items: [
        {
          roomNumber: '2005',
          guestName: 'Nikhel Antony Auguestine',
          roomName: 'Diplomatic Suite',
          checkInTime: 'Jan 12, 2024. 12:45 PM',
          checkOutTime: 'Jan 12, 2024. 11:00 AM',
          roomsOccupied: '1',
          adultsCount: '2',
          childCount: '1',
          totalNights: '2',
          guestPhoneNo: '+91 8089583858',
          guestEmail: 'vishnuanandababu@gmail.com'
        }
      ]
    }
  ];

  currentTab: string = 'accounts';
  currentDateString!: string;
  alertSuccess: boolean = false;
  showAllGuestList: boolean = true;
  showGuestProfile: boolean = false;
  addNewCheckInModal: boolean = false;
  formChangeWarningDialog: boolean = false;
  adultCountOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  childrenCountOptions: number[] = Array.from({ length: 11 }, (_, i) => i + 0);
  roomCountOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  remainingTimeInSeconds: number = 0;


  constructor(private fb: FormBuilder, private router: Router, private location: Location, private datePipe: DatePipe) { }

  // checkin form
  guestCheckInForm = this.fb.group({
    guestFullName: ['', [Validators.required, Validators.maxLength(100)]],
    totalAdults: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    totalChildren: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    totalRooms: [1, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    country: ['India', [Validators.required]],
    countryCode: ['+91', [Validators.required]],
    whatsappNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    guestEmail: ['', [Validators.required, Validators.email]],
    roomCategory: ['', [Validators.required]],
    roomNumber: ['', [Validators.required]],
    checkinTime: [this.currentDateString, [Validators.required]],
    checkoutTime: [this.currentDateString, [Validators.required]],
    los: [''],
    isBreakfastIncluded: [true],
    isLunchIncluded: [false],
    isDinnerIncluded: [false],
    isAllowFeedback: [true]
  }, { validator: this.dateRangeValidator('checkinTime', 'checkoutTime') })

  controlClass(controlName: string) {
    return { 'is-invalid': this.guestCheckInForm?.get(controlName)?.invalid && this.guestCheckInForm?.get(controlName)?.touched };
  }
  get itemInfo() {
    return this.guestCheckInForm;
  }

  ngOnInit(): void {
    this.calculateDateDifference();
    this.currentDateString = this.datePipe.transform('MMM dd, yyyy. hh:mm a')!;
  }

  // general
  addNewCheckIn() {
    this.addNewCheckInModal = true;
  }
  onModalClosed() {
    if (this.guestCheckInForm.dirty) {
      this.formChangeWarningDialog = true;
    } else {
      this.guestCheckInForm.reset();
      this.addNewCheckInModal = false;
      this.guestCheckInForm.get('totalChildren')?.setValue(0);
      this.guestCheckInForm.get('totalRooms')?.setValue(1);
      this.guestCheckInForm.get('isBreakfastIncluded')?.setValue(true);
      this.guestCheckInForm.get('isAllowFeedback')?.setValue(true);
    }
  }
  onConfirmClearChanges() {
    this.guestCheckInForm.reset();
    this.addNewCheckInModal = false;
    this.formChangeWarningDialog = false;
    this.guestCheckInForm.get('totalChildren')?.setValue(0);
    this.guestCheckInForm.get('totalRooms')?.setValue(1);
    this.guestCheckInForm.get('isBreakfastIncluded')?.setValue(true);
    this.guestCheckInForm.get('isAllowFeedback')?.setValue(true);
  }
  onCancelClearChanges() {
    this.formChangeWarningDialog = false;
  }

  // count 
  categoryTotalCount(category: any): string {
    const totalCount = category.items.length;
    return totalCount < 10 ? `0${totalCount}` : `${totalCount}`;
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
  calculateDateDifference() {
    const checkinTime = this.guestCheckInForm.get('checkinTime')?.value as string;
    const checkoutTime = this.guestCheckInForm.get('checkoutTime')?.value as string;

    if (checkinTime && checkoutTime) {
      const checkinDate = new Date(checkinTime);
      const checkoutDate = new Date(checkoutTime);
      const losInDays = Math.round((checkoutDate.getTime() - checkinDate.getTime()) / (24 * 60 * 60 * 1000));
      this.guestCheckInForm.patchValue({ los: losInDays });
    }
  }



  // checkin save
  onCheckInGuest() {
    // console.log('guest info', this.itemInfo)
    if (this.guestCheckInForm.valid) {
      this.alertSuccess = true;
      this.calculateDateDifference();
      console.log('guest info', this.itemInfo)


      // this.guestCheckInForm.get('totalChildren')?.setValue(0);
      // this.guestCheckInForm.get('totalRooms')?.setValue(1);
      // this.guestCheckInForm.get('isBreakfastIncluded')?.setValue(true);
      // this.guestCheckInForm.get('isAllowFeedback')?.setValue(true);
    }
    else {
      this.guestCheckInForm.markAllAsTouched();
    }
    this.alertSuccess = false;
  }

  // guest profile
  openGuestProfile(categoryIndex: number, itemIndex: number): void {
    this.updateUrl();
    this.showAllGuestList = false;
    this.showGuestProfile = true;

    const selectedCategory = this.roomDetails[categoryIndex];
    const selectedItem = selectedCategory.items[itemIndex];
    console.log(`Opening profile for ${selectedItem.guestName}`);
  }

  backToGuestList() {
    this.showAllGuestList = true;
    this.showGuestProfile = false;
  }

  private updateUrl(): void {
    const formattedPage = this.currentTab.toLowerCase().replace(/[\s-]+/g, '');
    this.location.go(`/core/guestcheckin/${formattedPage}`);
  }

  onGuestNavLink(tab: string) {
    this.currentTab = tab;
    this.updateUrl();
    if (tab === 'accounts') { }
    else if (tab === 'orders') { }
    else if (tab === 'reviews') { }
    else if (tab === 'guestprofile') { }
    else if (tab === 'activityfeed') { }
  }


}
