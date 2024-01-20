import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ClickOutsideModule } from 'ng-click-outside';
import { LibraryModule } from 'src/app/library/library.module';
import { QuickOrderComponent } from './quick-order/quick-order.component';



@NgModule({
  declarations: [
    OrdersComponent,
    QuickOrderComponent
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
export class OrderManagementModule { }
