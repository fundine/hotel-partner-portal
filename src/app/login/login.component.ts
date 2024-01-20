import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showPassword = false;

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  togglePasswordVisibility(controlName: string) {
    if (controlName === 'password') {
      this.showPassword = !this.showPassword;
    }
  }

  partnerLoginForm = this.fb.group({
    partnerID: ["", [Validators.required]],
    password: ["", [Validators.required]],
  })

  controlClass(controlName: string) {
    return { 'is-invalid': this.partnerLoginForm?.get(controlName)?.invalid && this.partnerLoginForm?.get(controlName)?.touched };
  }

  get productInfo() {
    return this.partnerLoginForm;
  }

  onPartnerLogin() {
    console.log('partner Login Info', this.partnerLoginForm)
    if (this.partnerLoginForm.valid) {
      this.router.navigate(['/core']);
    } else {
      this.partnerLoginForm.markAllAsTouched();
    }
  }
}


