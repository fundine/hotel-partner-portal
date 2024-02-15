import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { environment } from 'src/environment';

@Component({
  selector: 'app-outlet-management',
  templateUrl: './outlet-management.component.html',
  styleUrls: ['./outlet-management.component.scss']
})
export class OutletManagementComponent implements OnInit {

  // global variables
  public roleCode: string = environment.roleCode;
  public unitId: string = environment.unitId;
  // end global variables

  qrCodeUrl: string = 'https://chocolick.petpooja.com/orders/menu';
  innerLoading: boolean = false;
  alertSuccess: boolean = false;
  partnerUnitList: boolean = true;
  partnerUnitInfoEdit: boolean = false;
  formChangeWarningDialog: boolean = false;

  outlets: any = [];
  getAllOutletsInfo() {
    this.innerLoading = true;
    this.apiService.getAllPartnerUnits().subscribe(
      (data) => {
        this.outlets = data.results;
        console.log('Data from API:', data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      },
      () => {
        this.innerLoading = false;
      }
    );
  }


  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService) { }


  // outlet form
  outletInfoForm = this.fb.group({
    contactNumber: ['', [Validators.required]],
    unitLocation: ['', [Validators.required]],
    openingTime: ['', [Validators.required]],
    closingTime: ['', [Validators.required]],
    tagLine: ['', [Validators.maxLength(200)]],
    aboutOutlet: ['', [Validators.maxLength(1000)]],
    allowOnlineOrder:[true],
    allowFeedbackRequest:[true],
    allowOnlinePayment:[true],
  })
  controlClass(controlName: string) {
    return { 'is-invalid': this.outletInfoForm?.get(controlName)?.invalid && this.outletInfoForm?.get(controlName)?.touched };
  }
  get itemInfo() {
    return this.outletInfoForm;
  }

  ngOnInit(): void {
    this.getAllOutletsInfo()
  }

  // 
  toggleUnitStatus(selectedUnit: any, index: number) {
    // const unitId = this.outlets[index].unitId;
    // const isUnitOpen = !selectedUnit.isUnitOpen;
    // this.apiService.changeUnitStatus(unitId, isUnitOpen).subscribe(
    //   () => {
    //     this.outlets[index].isUnitOpen = isUnitOpen;
    //     // const openUnitsCount = this.getOpenUnitsCount();
    //     console.log('Unit status changed successfully.');
    //   },
    //   (error) => {
    //     console.error('Error in unit status changed:', error);
    //   }
    // );
  }

  // outlet update
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