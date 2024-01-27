import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
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

  passwordHide = false;
  confirmPasswordHide = false;
  alertSuccess: boolean = false;
  formChangeWarningDialog: boolean = false;
  allemployeeList: boolean = true;
  employeeProfile: boolean = false;
  employeeRegForm: boolean = false;

  // api
  selectedGenderId: any;
  genderItem: string = '';
  genderOptions: any;
  genderList: { id: string; genderName: string }[] | undefined;
  getUserGender() {
    this.apiService.getGenders().subscribe(
      (data) => {
        this.genderList = data.results;
        this.genderOptions = this.genderList!.map(option => option.genderName);
        console.log('Data from API:', data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  selectGender(event: any) {
    const selectedGenderName = event as string;
    const selectedGender = this.genderList!.find(item => item.genderName === selectedGenderName);

    if (selectedGender) {
      this.selectedGenderId = selectedGender.id;
      this.genderItem = selectedGender.genderName;
    }
  }

  selectedDocumentId: any;
  documentItem: string = '';
  documentOptions: any;
  documentList: { id: string; idDocType: string }[] | undefined;
  getUserDocument() {
    this.apiService.getIdentifiableDocument().subscribe(
      (data) => {
        this.documentList = data.results;
        this.documentOptions = this.documentList!.map(option => option.idDocType);
        console.log('Data from API:', data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  selectDocument(event: any) {
    const selectedDocumentName = event as string;
    const selectedDocument = this.documentList!.find(item => item.idDocType === selectedDocumentName);

    if (selectedDocument) {
      this.selectedDocumentId = selectedDocument.id;
      this.documentItem = selectedDocument.idDocType;
    }
  }

  selectedMaritalStatusId: any;
  maritalStatusItem: string = '';
  maritalStatusOptions: any;
  maritalStatusList: { id: string; maritalStatus: string }[] | undefined;
  getUserMaritalStatus() {
    this.apiService.getMaritalStatus().subscribe(
      (data) => {
        this.maritalStatusList = data.results;
        this.maritalStatusOptions = this.maritalStatusList!.map(option => option.maritalStatus);
        console.log('Data from API:', data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  selectMaritalStatus(event: any) {
    const selectedMaritalStatusName = event as string;
    const selectedMaritalStatus = this.maritalStatusList!.find(item => item.maritalStatus === selectedMaritalStatusName);

    if (selectedMaritalStatus) {
      this.selectedMaritalStatusId = selectedMaritalStatus.id;
      this.maritalStatusItem = selectedMaritalStatus.maritalStatus;
    }
  }

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
  selectNationality(event: any) {
    const selectedNationality = event as string;
    const selectedCountryItem = this.countryNameList!.find(item => item.countryName === selectedNationality);

    if (selectedCountryItem) {
      this.selectedISOCode = selectedCountryItem.nationality;
      this.countryName = selectedCountryItem.countryName;
    }
  }
  selectCountryCode(event: any) {
    const selectedCountryCode = event as string;
    const selectedCountryItem = this.countryCodeList!.find(item => item.countryCode === selectedCountryCode);

    if (selectedCountryItem) {
      this.selectedISOCode = selectedCountryItem.isoCode;
      this.countryName = selectedCountryItem.countryName;
      this.countryCode = selectedCountryItem.countryCode;
    }
  }

  selectedUserStatusId: any;
  userStatusItem: string = '';
  userStatusOptions: any;
  userStatusList: { id: string; statusVal: string }[] | undefined;
  getUserStatus() {
    this.apiService.getMaritalStatus().subscribe(
      (data) => {
        this.userStatusList = data.results;
        this.userStatusOptions = this.userStatusList!.map(option => option.statusVal);
        console.log('Data from API:', data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  selectUserStatus(event: any) {
    const selectedUserStatusName = event as string;
    const selectedUserStatus = this.userStatusList!.find(item => item.statusVal === selectedUserStatusName);

    if (selectedUserStatus) {
      this.selectedUserStatusId = selectedUserStatus.id;
      this.userStatusItem = selectedUserStatus.statusVal;
    }
  }

  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService) {
  }

  userRegistrationForm = this.fb.group({
    userFirstName: ['', [Validators.required, Validators.maxLength(20)]],
    userLastName: ['', [Validators.required, Validators.maxLength(30)]],
    genderId: [''],
    gender: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required, this.validateDateOfBirth]],
    age: ['', [Validators.required, this.validateAge]],
    maritalStatus: [''],
    nationality: [''],
    identifyingDocument: [''],
    documentNumber: [''],
    phoneCode: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    altPhoneCode: [''],
    altPhoneNumber: ['', [Validators.pattern(/^[0-9]+$/)]],
    emergencyContactNumber: [''],
    sponsorName: [''],
    sponsorPhoneCode: [''],
    sponsorPhoneNumber: ['', [Validators.pattern(/^[0-9]+$/)]],
    emailId: ['', [Validators.required, Validators.email]],
    jobTitle: [''],
    jobGrade: [''],
    employeeId: [''],
    highestQualification: [''],
    relevantExperience: [''],
    reportingManager: [''],
    languagesKnown: [''],
    dateOfJoining: [''],
    remarks: ['', [Validators.maxLength(500)]],
    userRole: ['', [Validators.required]],
    allowedOutlets: [this.fb.array([])],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]{6,}$/),],],
    confirmPassword: [''],
    userStatusId: [''],
    userStatus: ['', [Validators.required]],
    suspendedDate: [''],
    suspendedReason: [''],
    resignationDate: [''],
    resignationReason: [''],
  })
  controlClass(controlName: string) {
    return { 'is-invalid': this.userRegistrationForm?.get(controlName)?.invalid && this.userRegistrationForm?.get(controlName)?.touched };
  }
  get employeeInfo() {
    return this.userRegistrationForm;
  }

  ngOnInit(): void {
    this.getUserGender();
    this.getCountryList();
    this.getUserDocument();
    this.getUserMaritalStatus();
    this.getUserStatus();
  }

  // general
  registerNewUser() {
    this.allemployeeList = false;
    this.employeeRegForm = true;
  }
  validateDateOfBirth(control: { value: string | number | Date; }) {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    const age = currentDate.getFullYear() - selectedDate.getFullYear() -
      ((currentDate.getMonth() > selectedDate.getMonth() ||
        (currentDate.getMonth() === selectedDate.getMonth() &&
          currentDate.getDate() >= selectedDate.getDate())) ? 0 : 1);
    if (age < 18) {
      return { invalidAge: true };
    }
    return null;
  }
  calculateAge() {
    const birthdateValue = this.userRegistrationForm.controls.dateOfBirth.value;
    if (birthdateValue !== null) {
      const birthdate = new Date(birthdateValue);
      if (isNaN(birthdate.getTime())) {
        this.userRegistrationForm.controls.age.setValue('');
      } else {
        const timeDiff = Math.abs(Date.now() - birthdate.getTime());
        const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
        this.userRegistrationForm.controls.age.setValue(age.toString());
      }
    } else {
      this.userRegistrationForm.controls.age.setValue('');
    }
  }
  validateAge(control: AbstractControl) {
    const age = control.value;
    if (age >= 18 && age < 100) {
      return null;
    } else {
      return { invalidAge: true };
    }
  }
  togglePasswordVisibility(controlName: string) {
    if (controlName === 'password') {
      this.passwordHide = !this.passwordHide;
    } else if (controlName === 'confirmPassword') {
      this.confirmPasswordHide = !this.confirmPasswordHide;
    }
  }

  // register user
  onRegisterUser() {
    if (this.userRegistrationForm.valid) {
      this.alertSuccess = true;

      // this.userRegistrationForm.reset();
      console.log('Form Values:', this.userRegistrationForm.value);
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
      this.allemployeeList = true;
      this.employeeRegForm = false;
    }
  }
  onCancelClearChanges() {
    this.formChangeWarningDialog = false;
  }
  onBackConfirmClick() {
    this.alertSuccess = false;
    this.userRegistrationForm.reset();
    this.formChangeWarningDialog = false;
    this.allemployeeList = true;
    this.employeeRegForm = false;
  }


}