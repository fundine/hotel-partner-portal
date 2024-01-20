import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BroadcastComponent } from './broadcast/broadcast.component';
import { CustomersComponent } from './customers/customers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ClickOutsideModule } from 'ng-click-outside';
import { LibraryModule } from 'src/app/library/library.module';



@NgModule({
  declarations: [
    BroadcastComponent,
    CustomersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    ScrollingModule,
    ClickOutsideModule,
    LibraryModule
  ]
})
export class CustomerManagementModule { }
