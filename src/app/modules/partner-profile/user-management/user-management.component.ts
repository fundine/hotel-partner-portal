import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  users = [
    {
      userRoleId: '1',
      userRole: 'Manager',
      items: [
        { userId: '123', userName: 'John Doe', userRoleId: 1, userRole: 'Manager', assignedUnits: 'Outlet A, Outlet B', lastActive: '2023-12-11 10:30 AM', isDisable: false },
        { userId: '123', userName: 'Jane Smith', userRoleId: 2, userRole: 'Manager', assignedUnits: 'Outlet C', lastActive: '2023-12-11 09:45 AM', isDisable: false },
        { userId: '123', userName: 'Bob Johnson', userRoleId: 3, userRole: 'Manager', assignedUnits: 'Outlet D, Outlet E', lastActive: '2023-12-11 11:15 AM', isDisable: false },
        { userId: '123', userName: 'Alice Miller', userRoleId: 4, userRole: 'Manager', assignedUnits: 'Outlet F', lastActive: '2023-12-11 10:00 AM', isDisable: false },
        { userId: '123', userName: 'Charlie Brown', userRoleId: 5, userRole: 'Manager', assignedUnits: 'Outlet G', lastActive: '2023-12-11 12:00 PM', isDisable: false }
      ]
    },
    {
      userRoleId: '2',
      userRole: 'Cashier',
      items: [
        { userId: '123', userName: 'John Doe', userRoleId: 1, userRole: 'Cashier', assignedUnits: 'Outlet A, Outlet B', lastActive: '2023-12-11 10:30 AM', isDisable: false },
        { userId: '123', userName: 'Jane Smith', userRoleId: 2, userRole: 'Cashier', assignedUnits: 'Outlet C', lastActive: '2023-12-11 09:45 AM', isDisable: false },
        { userId: '123', userName: 'Bob Johnson', userRoleId: 3, userRole: 'Cashier', assignedUnits: 'Outlet D, Outlet E', lastActive: '2023-12-11 11:15 AM', isDisable: false },
        { userId: '123', userName: 'Alice Miller', userRoleId: 4, userRole: 'Cashier', assignedUnits: 'Outlet F', lastActive: '2023-12-11 10:00 AM', isDisable: false },
        { userId: '123', userName: 'Charlie Brown', userRoleId: 5, userRole: 'Cashier', assignedUnits: 'Outlet G', lastActive: '2023-12-11 12:00 PM', isDisable: false }
      ]
    },
  ];

  alertSuccess: boolean = false;
  formChangeWarningDialog: boolean = false;

  // api
  selectedISOCode: any;
  countryCode: string = '';
  countryName: string = '';
  nationality: string = '';
  countryNameOptions: any;
  countryCodeOptions: any;
  countryNameList: { isoCode: any; countryName: string; nationality: string, }[] | undefined;
  countryCodeList: { isoCode: string; countryCode: string, countryName: string, }[] | undefined;
  getCountryList() {
    this.apiService.getAllCountries().subscribe(
      (data) => {
        this.countryNameList = data.results;
        this.countryCodeList = data.results;
        this.countryNameOptions = this.countryNameList!.map(option => `${option.nationality} (${option.countryName})`);
        this.countryCodeOptions = this.countryCodeList!.map(option => `${option.countryName} (${option.countryCode})`);
        console.log('Data from API:', data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  // selectNationality(event: any) {
  //   const selectedNationality = event as string;
  //   const selectedCountryItem = this.countryNameList!.find(item => item.countryName === selectedNationality);

  //   if (selectedCountryItem) {
  //     this.selectedISOCode = selectedCountryItem.nationality;
  //     this.countryName = selectedCountryItem.countryName;
  //   }
  // }
  // selectCountryCode(event: any) {
  //   const selectedCountryCode = event as string;
  //   const selectedCountryItem = this.countryCodeList!.find(item => item.countryCode === selectedCountryCode);

  //   if (selectedCountryItem) {
  //     this.selectedISOCode = selectedCountryItem.isoCode;
  //     this.countryName = selectedCountryItem.countryName;
  //     this.countryCode = selectedCountryItem.countryCode;
  //   }
  // }

  selectNationality(event: any) {
    const selectedNationality = event as string;
    const selectedCountryItem = this.countryNameList!.find(item => item.countryName === selectedNationality);

    if (selectedCountryItem) {
      this.selectedISOCode = selectedCountryItem.nationality;
      this.countryName = selectedCountryItem.countryName;
      this.nationality = selectedCountryItem.countryName; // Show country name in the control
    }
  }

  selectCountryCode(event: any) {
    const selectedCountryCode = event as string;
    const selectedCountryItem = this.countryCodeList!.find(item => item.countryCode === selectedCountryCode);

    if (selectedCountryItem) {
      this.selectedISOCode = selectedCountryItem.isoCode;
      this.countryName = selectedCountryItem.countryName;
      this.countryCode = selectedCountryItem.countryCode; // Show country code in the control
    }
  }



  // selectedISOCode: any;
  // countryName: string = '';
  // countryNameOptions: any;
  // countryNameList: { isoCode: string; countryName: string }[] | undefined;
  // getCountryList() {
  //   this.apiService.getAllCountries().subscribe(
  //     (data) => {
  //       this.countryNameList = data.results;
  //       // this.countryNameOptions = this.countryNameList!.map(option => option.countryName);
  //       this.countryNameOptions = this.countryNameList!.map(option => `${option.isoCode} ${option.countryName}`);
  //       console.log('Data from API:', data);
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }
  // selectCountryName(event: any) {
  //   const selectedCountryName = event as string;
  //   const selectedCountryItem = this.countryNameList!.find(item => item.countryName === selectedCountryName);

  //   if (selectedCountryItem) {
  //     this.selectedISOCode = selectedCountryItem.isoCode;
  //     this.countryName = selectedCountryItem.countryName;
  //   }
  // }

  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService) { }

  userRegistrationForm = this.fb.group({
    userFirstName: ['', [Validators.required, Validators.maxLength(20)]],
    userLastName: ['', [Validators.required, Validators.maxLength(30)]],
    gender: ['', [Validators.required]],
    dateOfBirth: [''],
    age: [''],
    nationality: [''],
    phoneCode: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    altPhoneCode: ['', [Validators.required]],
    altPhoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    emergencyContactNumber: [''],
    emailId: ['', [Validators.required, Validators.email]],
    jobTitle: [''],
    employeeId: [''],
    dateOfJoining: [''],
    jobGrade: [''],
    reportingManager: [''],
    remarks: ['', [Validators.maxLength(500)]],
    jobRole: ['', [Validators.required]],
    allowedOutlets: [this.fb.array([]), [Validators.required]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
    confirmPassword: ['', Validators.required],
    userStatusId: ['', [Validators.required]],
    userStatus: ['', [Validators.required]],
  })
  controlClass(controlName: string) {
    return { 'is-invalid': this.userRegistrationForm?.get(controlName)?.invalid && this.userRegistrationForm?.get(controlName)?.touched };
  }
  get itemInfo() {
    return this.userRegistrationForm;
  }

  ngOnInit(): void {
    this.getCountryList();
  }



  // register user
  onRegisterUser() {
    if (this.userRegistrationForm.valid) {
      this.alertSuccess = true;

      // this.userRegistrationForm.reset();
    }
    else {
      this.userRegistrationForm.markAllAsTouched();
    }
    this.alertSuccess = false;
  }

  // return to home
  onCancelClick() {
    if (this.userRegistrationForm.dirty) {
      this.formChangeWarningDialog = true;
    }
    else {
      this.alertSuccess = false;
      this.userRegistrationForm.reset();
      this.router.navigate(['/core']);
    }
  }
  onCancelClearChanges() {
    this.formChangeWarningDialog = false;
  }
  onBackConfirmClick() {
    this.alertSuccess = false;
    this.userRegistrationForm.reset();
    this.router.navigate(['/core']);
  }


}