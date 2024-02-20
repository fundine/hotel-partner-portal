import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  unitFilter: boolean = true;

  maxDate: string;
  userProfile: any = [];
  loading: boolean = false;
  innerLoading: boolean = false;
  categoryTypeId: string = '1';
  reasonType: string = '';
  passwordHide = false;
  confirmPasswordHide = false;
  alertSuccess: boolean = false;
  formChangeWarningDialog: boolean = false;
  internalServerErrorDialog: boolean = false;
  userStatusChangeWarningDialog: boolean = false;
  UserIdExistsErrorDialog: boolean = false;
  allemployeeList: boolean = true;
  employeeProfile: boolean = false;
  employeeRegForm: boolean = false;
  skeletonLoadingTable = Array(2).fill(0);
  skeletonLoadingItems = Array(3).fill(0);

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

  selectedNationalityId: any;
  nationalityItem: string = '';
  nationalityOptions: any;
  nationalityList: { id: string; countryName: string; nationality: string; }[] | undefined;
  getNationality() {
    this.apiService.getAllCountries().subscribe(
      (data) => {

        this.nationalityList = data.results;
        this.nationalityOptions = this.nationalityList!.map(option => option.nationality);
        console.log('Data from API:', data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  selectNationality(event: any) {
    const selectedNationalityName = event as string;
    const selectedNationality = this.nationalityList!.find(item => item.nationality === selectedNationalityName);

    if (selectedNationality) {
      this.selectedNationalityId = selectedNationality.id;
      this.nationalityItem = selectedNationality.nationality;
    }
  }

  selectedCountryCodeId: any;
  selectedAltCountryCodeId: any;
  countryCode: string = '';
  altCountryCode: string = '';
  countryCodeOptions: any;
  countryCodeList: { id: string; isoCode: string; countryCode: string; countryName: string; }[] | undefined;

  getCountryCode() {
    this.apiService.getAllCountries().subscribe(
      (data) => {
        this.countryCodeList = data.results;
        this.countryCodeOptions = this.countryCodeList!.map(option => option.countryCode);
        // this.countryCodeOptions = this.countryCodeList!.map(option => `${option.countryName} (${option.countryCode})`);
        console.log('Data from API:', data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  selectCountryCode(event: any, isPrimary: boolean = false) {
    const selectedCountryCodeName = event as string;
    const selectedCountryCode = this.countryCodeList!.find(item => item.countryCode === selectedCountryCodeName);
    if (selectedCountryCode) {
      if (isPrimary) {
        this.selectedCountryCodeId = selectedCountryCode.id;
        this.countryCode = selectedCountryCode.countryCode;
      } else {
        this.selectedAltCountryCodeId = selectedCountryCode.id;
        this.altCountryCode = selectedCountryCode.countryCode;
      }
    }
  }

  selectedRoleId: any;
  userRoleItem: string = '';
  userRoleOptions: any;
  userRoleList: { id: string; roleName: string }[] | undefined;
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
      this.selectedRoleId = selectedRoleItem.id;
      this.userRoleItem = selectedRoleItem.roleName;
    }
  }

  selectedUnitId: string | undefined;
  itemUnitItem: string[] = [];
  // itemUnitOptions: string[] = []; 
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

    if (this.itemUnitList) { // Ensure itemUnitList exists
      const selectedUnitItem = this.itemUnitList.find(item => item.unitName === selectedUnitName);

      if (selectedUnitItem) {
        this.selectedUnitId = selectedUnitItem.unitId;
        this.itemUnitItem.push(selectedUnitItem.unitName); // Update selectedItems array
      }
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
      if (selectedUserStatus.id === '2') {
        this.reasonType = 'userinvalid';
        this.userStatusChangeWarningDialog = true;
      } else if (selectedUserStatus.id === '3') {
        this.reasonType = 'usersuspend';
        this.userRegistrationForm.get('date')?.setValidators([Validators.required]);
        this.userRegistrationForm.get('reason')?.setValidators([Validators.required]);
        this.getReasonList();
      } else if (selectedUserStatus.id === '4') {
        this.reasonType = 'userresign';
        this.userRegistrationForm.get('date')?.setValidators([Validators.required]);
        this.userRegistrationForm.get('reason')?.setValidators([Validators.required]);
        this.getReasonList();
      }
      this.userRegistrationForm.get('date')?.updateValueAndValidity();
      this.userRegistrationForm.get('reason')?.updateValueAndValidity();
    }
  }
  onConfirmUserStatusChange() {
    this.userStatusChangeWarningDialog = false;
  }
  onCancelUserStatusChange() {
    const previousUserStatus = this.userRegistrationForm.get('userStatus')?.value;
    if (previousUserStatus !== null && previousUserStatus !== undefined) {
      this.userRegistrationForm.get('userStatus')?.setValue(previousUserStatus);
    } else {
      this.userRegistrationForm.get('userStatus')?.setValue('');
    }
    this.userStatusChangeWarningDialog = false;
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
    firstName: ['', [Validators.required, Validators.maxLength(20)]],
    lastName: ['', [Validators.required, Validators.maxLength(30)]],

    genderId: [''],
    gender: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required, this.validateDateOfBirth]],
    age: ['', [Validators.required, this.validateAge]],
    maritalStatusId: [''],
    maritalStatus: [''],
    nationalityId: [''],
    nationality: [''],
    jobTitle: [''],
    employeeNo: [''],

    phoneCode: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    altPhoneCode: [''],
    altPhoneNumber: ['', [Validators.pattern(/^[0-9]+$/)]],
    emailId: ['', [Validators.required, Validators.email]],

    roleId: [''],
    role: ['', [Validators.required]],

    allowedOutlets: [[], [Validators.required]],

    userStatusId: [''],
    userStatus: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]{6,}$/),],],
    confirmPassword: [''],

    date: [''],
    reason: [''],
    remarks: ['', [Validators.maxLength(500)]],
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
  togglePasswordVisibility(controlName: string) {
    if (controlName === 'password') {
      this.passwordHide = !this.passwordHide;
    } else if (controlName === 'confirmPassword') {
      this.confirmPasswordHide = !this.confirmPasswordHide;
    }
  }
  onCancelDialog() {
    this.internalServerErrorDialog = false;
    this.UserIdExistsErrorDialog = false;
  }

  // user profile
  showUserProfile(roleIndex: number, userIndex: number) {
    this.allemployeeList = false;
    this.employeeProfile = true;
    this.innerLoading = true;
    const user = this.users[roleIndex].users[userIndex];
    const userId = user.userId;
    this.apiService.userProfile(userId).subscribe(
      (data: any) => {
        this.userProfile = data.results;
        console.log('User profile loaded successfully.');
      },
      (error) => {
        console.error('Error showing profile:', error);
        if (error.status == 500) {
          this.internalServerErrorDialog = true;
        }
      },
      () => {
        this.innerLoading = false;
      }
    );
  }
  userAge(dateOfBirth: string): string {
    const dob = new Date(dateOfBirth);
    const today = new Date();

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < dob.getDate())) {
      years--;
      months += 12;
    }
    return `${years} Years ${months} Months`;
  }

  // user registration
  userRegForm() {
    this.getUserGender();
    this.getNationality();
    this.getCountryCode();
    this.getUserMaritalStatus();
    this.getUserStatus();
    this.getUserRoles();
    this.getAllUnits();
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
  onRegisterUser() {
    if (this.userRegistrationForm.valid) {

      // const outletsFormArray = this.userRegistrationForm.get('allowedOutlets') as FormArray;
      const outletsFormArray = this.userRegistrationForm.controls.allowedOutlets as unknown as FormArray;

      const selectedOutletItems = outletsFormArray.value.map((unitName: string) => {
        const unit = this.itemUnitList?.find((item) => item.unitName === unitName);
        if (unit) {
          return { unitId: unit.unitId };
        } else {
          return null;
        }
      });

      const requestBody = {
        firstName: this.userRegistrationForm.get('firstName')?.value,
        lastName: this.userRegistrationForm.get('lastName')?.value,
        password: this.userRegistrationForm.get('password')?.value,
        basicDetails: {
          dateOfBirth: this.userRegistrationForm.get('dateOfBirth')?.value,
          genderId: this.selectedGenderId,
          maritalStatusId: this.selectedMaritalStatusId,
          nationalityId: this.selectedNationalityId,
          jobTitle: this.userRegistrationForm.get('jobTitle')?.value,
          employeeNo: this.userRegistrationForm.get('employeeNo')?.value || '',
        },
        contactInfo: {
          phoneCode: this.countryCode,
          phoneNumber: this.userRegistrationForm.get('phoneNumber')?.value,
          altPhoneCode: this.altCountryCode,
          altPhoneNumber: this.userRegistrationForm.get('altPhoneNumber')?.value,
          emailId: this.userRegistrationForm.get('emailId')?.value,
        },
        userRole: {
          roleId: this.selectedRoleId,
        },
        userOutlets: selectedOutletItems,
      }
      this.loading = true;
      console.log('User info', requestBody);
      this.apiService.saveUser(requestBody).subscribe(
        (response: any) => {
          console.log('User saved successfully', response);
          this.userRegistrationForm.reset();
          // this.isUniquNameShow = false;
        },
        (error) => {
          this.loading = false;
          if (error.status == 412) {
            // this.isUniquNameShow = true;
            this.UserIdExistsErrorDialog = true;
            this.userRegistrationForm.markAllAsTouched();
          } else if (error.status == 500) {
            this.internalServerErrorDialog = true;
          }

          // if (error instanceof HttpErrorResponse && error.status === 500) {
          //  this.internalServerError.emit();
          // }
          console.error('Error saving User', error);
        },
        () => {
          this.loading = false;
          this.alertSuccess = true;
        }
      );
      console.log('User Data:', this.userRegistrationForm.value);
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
      this.onBackConfirmClick();
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
    // this.getAllUserList();
  }
}
