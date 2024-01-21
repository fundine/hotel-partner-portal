import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-quick-add',
  templateUrl: './room-quick-add.component.html',
  styleUrls: ['./room-quick-add.component.scss']
})
export class RoomQuickAddComponent implements OnInit {

  loading: boolean = false;
  qrCodeUrl: string = 'https://';
  adultCountOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  childrenCountOptions: number[] = Array.from({ length: 11 }, (_, i) => i + 0);

  constructor(private fb: FormBuilder, private router: Router) { }

  selectEntityType() {

  }

  roomQuickAddForm = this.fb.group({
    roomCategoryName: ['', [Validators.required]],
    roomBlock: ['', [Validators.required, Validators.maxLength(50)]],
    roomFloor: ['', [Validators.required, Validators.maxLength(50)]],
    roomNumber: ['', [Validators.required, Validators.maxLength(10)]],
    roomBedType: [''],
    maxAdultOccupancy: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    maxChildOccupancy: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    quickScanUrl: ['', [Validators.required]],
    qrCode: [''],
    isRoomStatus: [''],

    isRoomVacant: [true], // auto setting flag
    isRoomOccupied: [false], // auto setting flag
    isCleaningInProgress: [false], // auto setting flag


    isRoomOnHold: [false],
    isUnderMaintenance: [false],
    isRoomDisable: [false],

    // differentPricing: [false],
    // roomPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
    // roomTax: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?%?$/)]],
    // roomFinalPrice: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],

  })
  controlClass(controlName: string) {
    return { 'is-invalid': this.roomQuickAddForm?.get(controlName)?.invalid && this.roomQuickAddForm?.get(controlName)?.touched };
  }
  get roomInfo() {
    return this.roomQuickAddForm;
  }

  ngOnInit(): void {

  }

  onRoomsBatchEntry() {

  }

}
