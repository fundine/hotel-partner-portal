import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.scss']
})
export class LockScreenComponent implements OnInit {

  showPassword = false;

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void { }

  togglePasswordVisibility(controlName: string) {
    if (controlName === 'password') {
      this.showPassword = !this.showPassword;
    }
  }

  lockScreenForm = this.fb.group({
    password: ["", [Validators.required]]
  })

  controlClass(controlName: string) {
    return { 'is-invalid': this.lockScreenForm?.get(controlName)?.invalid && this.lockScreenForm?.get(controlName)?.touched };
  }

  onUnlockScreen() {
    console.log('lock Info', this.lockScreenForm)
    if (this.lockScreenForm.valid) {
      this.router.navigate(['/core']);
    } else {
      this.lockScreenForm.markAllAsTouched();
    }
  }

}
