import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckInComponent } from '../modules/front-office/check-in/check-in.component';
import { DineTrackComponent } from '../modules/front-office/dine-track/dine-track.component';
import { OrdersComponent } from '../modules/order-management/orders/orders.component';
import { MenuEditorComponent } from '../modules/menu-management/menu-editor/menu-editor.component';
import { RoomEditorComponent } from '../modules/room-management/room-editor/room-editor.component';
import { QuickAddComponent } from '../modules/menu-management/quick-add/quick-add.component';
import { BatchEntryComponent } from '../modules/menu-management/batch-entry/batch-entry.component';
import { FeaturedGroupComponent } from '../modules/menu-management/featured-group/featured-group.component';
import { RoomQuickAddComponent } from '../modules/room-management/room-quick-add/room-quick-add.component';
import { RoomBatchEntryComponent } from '../modules/room-management/room-batch-entry/room-batch-entry.component';
import { InsightsComponent } from '../modules/biz-analytics/insights/insights.component';
import { CategoryManagementComponent } from '../modules/menu-management/category-management/category-management.component';
import { PartnerProfileComponent } from '../modules/partner-profile/partner-profile.component';
import { OutletManagementComponent } from '../modules/partner-profile/outlet-management/outlet-management.component';
import { UserManagementComponent } from '../modules/partner-profile/user-management/user-management.component';
import { FinanceComponent } from '../modules/partner-profile/finance/finance.component';
import { DiscountCouponsComponent } from '../modules/partner-profile/discount-coupons/discount-coupons.component';
import { SettingsComponent } from '../modules/partner-profile/settings/settings.component';
import { CustomersComponent } from '../modules/customer-management/customers/customers.component';
import { BroadcastComponent } from '../modules/customer-management/broadcast/broadcast.component';
import { GuestaccountsComponent } from '../modules/front-office/guestaccounts/guestaccounts.component';
import { GuestordersComponent } from '../modules/front-office/guestorders/guestorders.component';
import { GuestreviewsComponent } from '../modules/front-office/guestreviews/guestreviews.component';
import { GuestprofileComponent } from '../modules/front-office/guestprofile/guestprofile.component';
import { GuestactivityfeedComponent } from '../modules/front-office/guestactivityfeed/guestactivityfeed.component';
import { RoomCleaningComponent } from '../modules/room-management/room-cleaning/room-cleaning.component';
import { ValetParkingComponent } from '../modules/front-office/valet-parking/valet-parking.component';


const routes: Routes = [
  { path: '', redirectTo: 'orders', pathMatch: 'full' },
  { path: 'guestcheckin', component: CheckInComponent },
  { path: 'dinetrack', component: DineTrackComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'menueditor', component: MenuEditorComponent },
  { path: 'roomeditor', component: RoomEditorComponent },
  { path: 'menueditor/quickadd', component: QuickAddComponent },
  { path: 'menueditor/batchentry', component: BatchEntryComponent },
  { path: 'menueditor/featuredgroup', component: FeaturedGroupComponent },
  { path: 'roomeditor/quickadd', component: RoomQuickAddComponent }, 
  { path: 'roomeditor/batchentry', component: RoomBatchEntryComponent },
  { path: 'categorymanagement', component: CategoryManagementComponent },
  { path: 'insights', component: InsightsComponent },
  { path: 'partnerprofile', component: PartnerProfileComponent },
  { path: 'partnerprofile/outletmanagement', component: OutletManagementComponent },
  { path: 'partnerprofile/usermanagement', component: UserManagementComponent },
  { path: 'partnerprofile/financesettings', component: FinanceComponent },
  { path: 'partnerprofile/discountcoupons', component: DiscountCouponsComponent },
  { path: 'partnerprofile/settings', component: SettingsComponent },
  { path: 'guestcheckin/accounts', component: GuestaccountsComponent },
  { path: 'guestcheckin/orders', component: GuestordersComponent },
  { path: 'guestcheckin/reviews', component: GuestreviewsComponent },
  { path: 'guestcheckin/guestprofile', component: GuestprofileComponent },
  { path: 'guestcheckin/activityfeed', component: GuestactivityfeedComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'broadcast', component: BroadcastComponent },
  { path: 'roomcleaning', component: RoomCleaningComponent },
  { path: 'valetparking', component: ValetParkingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
