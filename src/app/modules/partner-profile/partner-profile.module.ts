import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceComponent } from './finance/finance.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { OutletManagementComponent } from './outlet-management/outlet-management.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ClickOutsideModule } from 'ng-click-outside';
import { LibraryModule } from 'src/app/library/library.module';
import { PartnerProfileComponent } from './partner-profile.component';
import { DiscountCouponsComponent } from './discount-coupons/discount-coupons.component';
import { QrCodeModule } from 'ng-qrcode';



@NgModule({
  declarations: [
    FinanceComponent,
    UserManagementComponent,
    OutletManagementComponent,
    SettingsComponent,
    PartnerProfileComponent,
    DiscountCouponsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    ScrollingModule,
    ClickOutsideModule,
    QrCodeModule,
    LibraryModule
  ]
})
export class PartnerProfileModule { }
