import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInComponent } from './check-in/check-in.component';
import { DineTrackComponent } from './dine-track/dine-track.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ClickOutsideModule } from 'ng-click-outside';
import { LibraryModule } from 'src/app/library/library.module';

import { GuestaccountsComponent } from './guestaccounts/guestaccounts.component';
import { GuestordersComponent } from './guestorders/guestorders.component';
import { GuestreviewsComponent } from './guestreviews/guestreviews.component';
import { GuestprofileComponent } from './guestprofile/guestprofile.component';
import { GuestactivityfeedComponent } from './guestactivityfeed/guestactivityfeed.component';
import { ValetParkingComponent } from './valet-parking/valet-parking.component';



@NgModule({
  declarations: [
    CheckInComponent,
    DineTrackComponent,
    GuestaccountsComponent,
    GuestordersComponent,
    GuestreviewsComponent,
    GuestprofileComponent,
    GuestactivityfeedComponent,
    ValetParkingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    ScrollingModule,
    ClickOutsideModule,
    LibraryModule,
  ]
})
export class FrontOfficeModule { }
