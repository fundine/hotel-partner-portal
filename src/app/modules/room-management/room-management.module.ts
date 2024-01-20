import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomEditorComponent } from './room-editor/room-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ClickOutsideModule } from 'ng-click-outside';
import { QrCodeModule } from 'ng-qrcode';
import { LibraryModule } from 'src/app/library/library.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { RoomQuickAddComponent } from './room-quick-add/room-quick-add.component';
import { RoomBatchEntryComponent } from './room-batch-entry/room-batch-entry.component';
import { RoomCleaningComponent } from './room-cleaning/room-cleaning.component';
import { RoomAvailabiltyComponent } from './room-availabilty/room-availabilty.component';



@NgModule({
  declarations: [
    RoomEditorComponent,
    RoomQuickAddComponent,
    RoomBatchEntryComponent,
    RoomCleaningComponent,
    RoomAvailabiltyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    ScrollingModule,
    ClickOutsideModule,
    QrCodeModule,
    LibraryModule,
    SharedModule
  ]
})
export class RoomManagementModule { }
