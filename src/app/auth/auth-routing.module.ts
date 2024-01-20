import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppErrorComponent } from './app-error/app-error.component';
import { LockScreenComponent } from './lock-screen/lock-screen.component';

const routes: Routes = [
  { path: 'error', component: AppErrorComponent },
  { path: 'accesslocked', component: LockScreenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
