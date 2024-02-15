import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppErrorComponent } from './auth/app-error/app-error.component';
import { CoreComponent } from './core/core.component';

const routes: Routes = [
  { path: '', redirectTo: 'partnerlogin', pathMatch: 'full' },
  { path: 'partnerlogin', component: LoginComponent },
  // { path: '**', component: AppErrorComponent }, 
  {
    path: 'core',
    component: CoreComponent,
    loadChildren: () => import('./core/core.module')
      .then(m => m.CoreModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
