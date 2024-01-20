import { Component, OnInit, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild('oldPasswordInput') oldPasswordInputRef!: ElementRef;

  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  @Output() closeChangePasswordModal = new EventEmitter<void>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.oldPasswordInputRef.nativeElement.focus();
    }, 600);
  }

  changePasswordForm = this.fb.group({
    oldPassword: ["", [Validators.required]],
    newPassword: ["", [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{5,}$/)]],
    confirmPassword: ["", [Validators.required]],
  });

  togglePasswordVisibility(controlName: string) {
    if (controlName === 'oldPassword') {
      this.showOldPassword = !this.showOldPassword;
    } else if (controlName === 'newPassword') {
      this.showNewPassword = !this.showNewPassword;
    } else if (controlName === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  controlClass(controlName: string) {
    return { 'is-invalid': this.changePasswordForm?.get(controlName)?.invalid && this.changePasswordForm?.get(controlName)?.touched };
  }
  isPatternError(controlName: string): boolean {
    const control = this.changePasswordForm.get(controlName);
    return !!control && control.hasError('pattern') && (control.touched || control.dirty);
  }

  get passwordInfo() {
    return this.changePasswordForm;
  }

  onChangePassword() {
    if (this.changePasswordForm.valid) {

      this.changePasswordForm.reset();
      this.closeChangePasswordModal.emit();
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }

  onCancelChangePassword() {
    this.closeChangePasswordModal.emit();
  }

}

