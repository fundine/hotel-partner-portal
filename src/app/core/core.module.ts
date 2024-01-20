import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { HttpClientModule } from '@angular/common/http';
import { ClickOutsideModule } from 'ng-click-outside';

import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LibraryModule } from '../library/library.module';
import { AuthModule } from '../auth/auth.module';
import { FrontOfficeModule } from '../modules/front-office/front-office.module';
import { MenuManagementModule } from '../modules/menu-management/menu-management.module';
import { RoomManagementModule } from '../modules/room-management/room-management.module';
import { OrderManagementModule } from '../modules/order-management/order-management.module';
import { PartnerProfileModule } from '../modules/partner-profile/partner-profile.module';
import { CustomerManagementModule } from '../modules/customer-management/customer-management.module';
import { BizAnalyticsModule } from '../modules/biz-analytics/biz-analytics.module';
import { ReportsModule } from '../modules/reports/reports.module';



@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    ClickOutsideModule,
    LibraryModule,
    AuthModule,
    FrontOfficeModule,
    MenuManagementModule,
    RoomManagementModule,
    OrderManagementModule,
    PartnerProfileModule,
    CustomerManagementModule,
    BizAnalyticsModule,
    ReportsModule
  ]
})
export class CoreModule { }
