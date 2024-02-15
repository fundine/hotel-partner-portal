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

  maxDate: string;
  suspendedReasonModal: boolean = false;
  resignedReasonModal: boolean = false;
  innerLoading: boolean = false;
  categoryTypeId: string = '1';
  reasonType: string = '';
  passwordHide = false;
  confirmPasswordHide = false;
  alertSuccess: boolean = false;
  formChangeWarningDialog: boolean = false;
  userSuspendedModal: boolean = false;
  userResignedModal: boolean = false;
  allemployeeList: boolean = true;
  employeeProfile: boolean = false;
  employeeRegForm: boolean = false;

  // api
  users: any = [];
  getAllUserList() {
    this.innerLoading = true;
    this.apiService.userList().subscribe(
      (data) => {
        this.users = data.results;
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
  listAllowedUnits(units: any[]): string {
    return units.map(unit => unit.unitName).join(', ');
  }

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

  selectedRoleCode: any;
  userRoleItem: any[] = [];
  userRoleOptions: any;
  userRoleList: { roleCode: string; roleName: string }[] | undefined;
  getUserRoles() {
    this.apiService.userRoleList().subscribe(
      (data) => {
        this.userRoleList = data.results;
        this.userRoleOptions = this.userRoleList!.map(option => option.roleName);
        console.log('Data from API:', data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  selectRoleType(event: any) {
    const selectedRoleName = event as string;
    const selectedRoleItem = this.userRoleList!.find(item => item.roleName === selectedRoleName);

    if (selectedRoleItem) {
      this.selectedRoleCode = selectedRoleItem.roleCode;
      this.userRoleItem.push(selectedRoleItem.roleName);
    }
  }

  selectedUnitId: any;
  itemUnitItem: any[] = [];
  itemUnitOptions: any;
  itemUnitList: { unitId: string; unitName: string; unitTypeName: string }[] | undefined;
  getAllUnits() {
    this.apiService.getUnitsList().subscribe(
      (data) => {
        this.itemUnitList = data.results;
        this.itemUnitOptions = this.itemUnitList!.map(option => option.unitName);
        console.log('Data from API:', data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  selectUnitType(event: any) {
    const selectedUnitName = event as string;
    const selectedUnitItem = this.itemUnitList!.find(item => item.unitName === selectedUnitName);

    if (selectedUnitItem) {
      this.selectedUnitId = selectedUnitItem.unitId;
      this.itemUnitItem.push(selectedUnitItem.unitName);
    }
  }


  selectedReasonId: any;
  reasonItem: string = '';
  reasonOptions: any;
  reasonList: { id: string; reason: string }[] | undefined;
  getReasonList() {
    this.apiService.getReasons(this.reasonType).subscribe(
      (data) => {
        this.reasonList = data.results;
        this.reasonOptions = this.reasonList!.map(option => option.reason);
        console.log('Data from API:', data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  selectReason(event: any) {
    const selectedReasonName = event as string;
    const selectedReason = this.reasonList!.find(item => item.reason === selectedReasonName);

    if (selectedReason) {
      this.selectedReasonId = selectedReason.id;
      this.reasonItem = selectedReason.reason;
    }
  }

  selectedUserStatusId: any;
  userStatusItem: string = '';
  userStatusOptions: any;
  userStatusList: { id: string; statusVal: string }[] | undefined;
  getUserStatus() {
    this.apiService.getUserStatus().subscribe(
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

      this.userActionReasons(selectedUserStatus.id);
    }
  }
  userActionReasons(userId: string) {
    const selectedUserStatus = this.userStatusList!.find(item => item.id === userId);

    if (selectedUserStatus) {
      if (selectedUserStatus.id === '3') {
        this.reasonType = 'usersuspend';
        this.suspendedReasonModal = true;
        this.getReasonList();
      } else if (selectedUserStatus.id === '4') {
        this.reasonType = 'userresign';
        this.resignedReasonModal = true;
        this.getReasonList();
      }
    }
  }


  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
    const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    this.maxDate = `${year}-${month}-${day}`;
  }

  // registration form
  userRegistrationForm = this.fb.group({
    userFirstName: ['', [Validators.required, Validators.maxLength(20)]],
    userLastName: ['', [Validators.required, Validators.maxLength(30)]],

    basicDetails: this.fb.group({
      genderId: [''],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required, this.validateDateOfBirth]],
      age: ['', [Validators.required, this.validateAge]],
      maritalStatus: [''],
      nationality: [''],
      jobTitle: [''],
      employeeId: [''],
    }),

    contactInfo: this.fb.group({
      phoneCode: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      altPhoneCode: [''],
      altPhoneNumber: ['', [Validators.pattern(/^[0-9]+$/)]],
      emailId: ['', [Validators.required, Validators.email]],
    }),

    userRole: this.fb.group({
      role: ['', [Validators.required]],
    }),

    userOutlets: this.fb.group({
      allowedOutlets: [this.fb.array([])],
    }),

    userStatusId: [''],
    userStatus: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]{6,}$/),],],
    confirmPassword: [''],

    suspendedReason: this.fb.group({
      date: [''],
      reason: [''],
      remarks: ['', [Validators.maxLength(500)]],
    }),

    resignationReason: this.fb.group({
      date: [''],
      reason: [''],
      remarks: ['', [Validators.maxLength(500)]],
    })

  })
  controlClass(controlName: string) {
    return { 'is-invalid': this.userRegistrationForm?.get(controlName)?.invalid && this.userRegistrationForm?.get(controlName)?.touched };
  }
  get employeeInfo() {
    return this.userRegistrationForm;
  }

  ngOnInit(): void {
    this.getAllUserList();
  }

  // general
  userRegForm() {
    this.getUserGender();
    this.getCountryList();
    this.getUserMaritalStatus();
    this.getUserStatus();
    this.getUserRoles();
    this.getAllUnits();
    this.allemployeeList = false;
    this.employeeRegForm = true;
  }
  showUserProfie() {
    this.allemployeeList = false;
    this.employeeProfile = true;
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
  // calculateAge() {
  //   const birthdateValue = this.userRegistrationForm.controls.dateOfBirth.value;
  //   if (birthdateValue !== null) {
  //     const birthdate = new Date(birthdateValue);
  //     if (isNaN(birthdate.getTime())) {
  //       this.userRegistrationForm.controls.age.setValue('');
  //     } else {
  //       const timeDiff = Math.abs(Date.now() - birthdate.getTime());
  //       const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
  //       this.userRegistrationForm.controls.age.setValue(age.toString());
  //     }
  //   } else {
  //     this.userRegistrationForm.controls.age.setValue('');
  //   }
  // }
  // validateAge(control: AbstractControl) {
  //   const age = control.value;
  //   if (age >= 18 && age < 100) {
  //     return null;
  //   } else {
  //     return { invalidAge: true };
  //   }
  // }

  calculateAge() {
    const birthdateValue = this.userRegistrationForm.get('basicDetails.dateOfBirth')?.value;
    if (birthdateValue !== undefined && birthdateValue !== null) {
      const birthdate = new Date(birthdateValue);
      if (isNaN(birthdate.getTime())) {
        this.userRegistrationForm.get('basicDetails.age')?.setValue('');
      } else {
        const timeDiff = Math.abs(Date.now() - birthdate.getTime());
        const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
        this.userRegistrationForm.get('basicDetails.age')?.setValue(age.toString());
      }
    } else {
      this.userRegistrationForm.get('basicDetails.age')?.setValue('');
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

  // modal
  onModalClosed() {
    this.suspendedReasonModal = false;
    this.resignedReasonModal = false;
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