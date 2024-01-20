import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AppErrorComponent } from './app-error/app-error.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LockScreenComponent } from './lock-screen/lock-screen.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppErrorComponent,
    ChangePasswordComponent,
    LockScreenComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    AppErrorComponent,
    ChangePasswordComponent,
    LockScreenComponent
  ]
})
export class AuthModule { }
